import path from 'path';

import cuid from 'cuid';

import { Either } from '../../util/Either';
import { ErrorCode } from '../AppError';
import { Context } from '../Context';
import { R } from '../R';
import { generateImageUrl } from '../../infra/upload';
import { makeClient, SignedUrl } from '../../infra/space';
import { ImageInput } from '../Input';
import { apply, concat, isImageExtension, maxLen, minLen, notEmpty } from '../../util/validator';
import { getLRUAssetStorage } from './assetStore';


const imageV = apply<ImageInput>({
  title: concat(
    notEmpty('Title should not be empty'),
    minLen(2, 'Title should be at least 2 characters'),
    maxLen(48, 'Title should not be more than 48 characters')),

  extension: isImageExtension('Invalid image extension provided')
});


export async function createImageUploadIntent(ctx: Context, input: ImageInput): DomainResult<SignedUrl> {

  const { db } = ctx;
  const publicationId = 1;
  const title = path.basename(input.title).trim();
  const extension = input.extension;

  const result = imageV({ title, extension: input.extension });

  if (Either.isLeft(result)) {
    return R.ofError(ErrorCode.INVALID_DATA, result.value.join('\n'));
  }

  const source = await getLRUAssetStorage(ctx);

  if (!source) {
    return R.ofError(ErrorCode.NO_ASSET_STORE, 'At least one asset source is required');
  }

  // TODO: Allow 50 images per user per 24 hours.

  const fileName = `${publicationId}/${title}-${cuid()}.${extension}`;

  const _image = await db.image.create({
    data: {
      altText: '',
      caption: '',
      asset: {
        create: {
          title,
          fileName,
          size: 0,
          sizeUnit: 'byte',
          publicationId,
          storageId: source.id,
          contentType: 'image/'
        }
      }
    }
  });

  // Currently, support only Digital Ocean spaces
  const client = makeClient(source.region, source.uploadUrl, source.key, source.secret);
  const uploadUrl = await generateImageUrl(client, source.bucket, fileName);

  client.destroy();

  return R.of(uploadUrl);
}
