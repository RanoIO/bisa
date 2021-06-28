/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as Op from "./domain/Output"
import { Context } from "./domain/Context"
import { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
    /**
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "JSONObject";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "JSONObject";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  AppConfigInput: { // input type
    email?: NexusGenInputs['EmailConfigInput'] | null; // EmailConfigInput
  }
  AssetSourceInput: { // input type
    bucket: string; // String!
    cloudType: string; // String!
    key: string; // String!
    publicUrl: string; // String!
    region: string; // String!
    secret: string; // String!
    uploadUrl: string; // String!
  }
  EmailConfigInput: { // input type
    apiKey: string; // String!
    fromEmail: string; // String!
    fromName: string; // String!
    service: NexusGenEnums['EmailServiceType']; // EmailServiceType!
  }
  ImageInput: { // input type
    extension: string; // String!
    title: string; // String!
  }
  NewPublicationInput: { // input type
    firstUser: NexusGenInputs['UserInput']; // UserInput!
    fromEmail: string; // String!
    name: string; // String!
    password?: string | null; // String
    publicUrl: string; // String!
    quota: NexusGenInputs['QuotaInput']; // QuotaInput!
  }
  PostInput: { // input type
    content: NexusGenScalars['JSONObject']; // JSONObject!
    meta: NexusGenInputs['PostMetaInput']; // PostMetaInput!
    slug?: string | null; // String
    title: string; // String!
  }
  PostMetaInput: { // input type
    description: string; // String!
    title: string; // String!
  }
  QuotaInput: { // input type
    assetSize: number; // Int!
    staffCapacity: number; // Int!
  }
  TagInput: { // input type
    description?: string | null; // String
    name: string; // String!
    slug?: string | null; // String
  }
  TokenInput: { // input type
    password: string; // String!
    username: string; // String!
  }
  UserInput: { // input type
    email: string; // String!
    firstName: string; // String!
    lastName: string; // String!
  }
}

export interface NexusGenEnums {
  EmailServiceType: "sendgrid"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: Date
  JSONObject: any
}

export interface NexusGenObjects {
  AppError: { // root type
    errors: NexusGenRootTypes['Error'][]; // [Error!]!
  }
  AssetSource: { // root type
    bucket: string; // String!
    cloudType: string; // String!
    id: string; // ID!
    key: string; // String!
    publicUrl: string; // String!
    region: string; // String!
    uploadUrl: string; // String!
  }
  AuthToken: Op.AuthToken;
  Error: { // root type
    code: string; // String!
    message: string; // String!
  }
  Mutation: {};
  Post: Op.Post;
  PostMeta: Op.PostMeta;
  Publication: Op.Publication;
  Query: {};
  Result: Op.Result;
  SignedUrl: { // root type
    fields: NexusGenRootTypes['UrlFormField'][]; // [UrlFormField!]!
    url: string; // String!
  }
  Tag: { // root type
    approved: boolean; // Boolean!
    description: string; // String!
    id: string; // ID!
    name: string; // String!
    slug: string; // String!
  }
  UrlFormField: { // root type
    key: string; // String!
    value: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
  AssetSourceResponse: NexusGenRootTypes['AppError'] | NexusGenRootTypes['AssetSource'];
  AuthTokenResponse: NexusGenRootTypes['AppError'] | NexusGenRootTypes['AuthToken'];
  NewPublicationResponse: NexusGenRootTypes['AppError'] | NexusGenRootTypes['Publication'];
  PostResponse: NexusGenRootTypes['AppError'] | NexusGenRootTypes['Post'];
  ResultResponse: NexusGenRootTypes['AppError'] | NexusGenRootTypes['Result'];
  SignedUrlResponse: NexusGenRootTypes['AppError'] | NexusGenRootTypes['SignedUrl'];
  TagResponse: NexusGenRootTypes['AppError'] | NexusGenRootTypes['Tag'];
}

export type NexusGenRootTypes = NexusGenObjects & NexusGenUnions

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AppError: { // field return type
    errors: NexusGenRootTypes['Error'][]; // [Error!]!
  }
  AssetSource: { // field return type
    bucket: string; // String!
    cloudType: string; // String!
    id: string; // ID!
    key: string; // String!
    publicUrl: string; // String!
    region: string; // String!
    uploadUrl: string; // String!
  }
  AuthToken: { // field return type
    duration: number; // Int!
    generatedAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    type: string; // String!
  }
  Error: { // field return type
    code: string; // String!
    message: string; // String!
  }
  Mutation: { // field return type
    addAdministrator: NexusGenRootTypes['ResultResponse']; // ResultResponse!
    addMemberToPublication: NexusGenRootTypes['ResultResponse']; // ResultResponse!
    approveTag: NexusGenRootTypes['Tag']; // Tag!
    authenticateUser: NexusGenRootTypes['AuthTokenResponse']; // AuthTokenResponse!
    createAssetSource: NexusGenRootTypes['AssetSourceResponse']; // AssetSourceResponse!
    createPost: NexusGenRootTypes['PostResponse']; // PostResponse!
    createPublication: NexusGenRootTypes['NewPublicationResponse']; // NewPublicationResponse!
    createTag: NexusGenRootTypes['TagResponse']; // TagResponse!
    deletePost: NexusGenRootTypes['PostResponse']; // PostResponse!
    forgotPassword: boolean; // Boolean!
    initialize: NexusGenRootTypes['ResultResponse']; // ResultResponse!
    resetPassword: boolean; // Boolean!
    updateAppConfig: NexusGenRootTypes['ResultResponse']; // ResultResponse!
    updatePost: NexusGenRootTypes['PostResponse']; // PostResponse!
    updateTag: NexusGenRootTypes['TagResponse']; // TagResponse!
    uploadImage: NexusGenRootTypes['SignedUrlResponse']; // SignedUrlResponse!
  }
  Post: { // field return type
    content: NexusGenScalars['JSONObject']; // JSONObject!
    id: string; // ID!
    meta: NexusGenRootTypes['PostMeta'] | null; // PostMeta
    slug: string; // String!
    title: string; // String!
  }
  PostMeta: { // field return type
    description: string; // String!
    postId: string; // ID!
    title: string; // String!
  }
  Publication: { // field return type
    fromEmail: string; // String!
    id: string; // ID!
    name: string; // String!
    publicUrl: string; // String!
  }
  Query: { // field return type
    getPublications: NexusGenRootTypes['Publication'][]; // [Publication!]!
    getTags: NexusGenRootTypes['Tag'][]; // [Tag!]!
  }
  Result: { // field return type
    status: boolean; // Boolean!
  }
  SignedUrl: { // field return type
    fields: NexusGenRootTypes['UrlFormField'][]; // [UrlFormField!]!
    url: string; // String!
  }
  Tag: { // field return type
    approved: boolean; // Boolean!
    description: string; // String!
    id: string; // ID!
    name: string; // String!
    slug: string; // String!
  }
  UrlFormField: { // field return type
    key: string; // String!
    value: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AppError: { // field return type name
    errors: 'Error'
  }
  AssetSource: { // field return type name
    bucket: 'String'
    cloudType: 'String'
    id: 'ID'
    key: 'String'
    publicUrl: 'String'
    region: 'String'
    uploadUrl: 'String'
  }
  AuthToken: { // field return type name
    duration: 'Int'
    generatedAt: 'DateTime'
    id: 'String'
    type: 'String'
  }
  Error: { // field return type name
    code: 'String'
    message: 'String'
  }
  Mutation: { // field return type name
    addAdministrator: 'ResultResponse'
    addMemberToPublication: 'ResultResponse'
    approveTag: 'Tag'
    authenticateUser: 'AuthTokenResponse'
    createAssetSource: 'AssetSourceResponse'
    createPost: 'PostResponse'
    createPublication: 'NewPublicationResponse'
    createTag: 'TagResponse'
    deletePost: 'PostResponse'
    forgotPassword: 'Boolean'
    initialize: 'ResultResponse'
    resetPassword: 'Boolean'
    updateAppConfig: 'ResultResponse'
    updatePost: 'PostResponse'
    updateTag: 'TagResponse'
    uploadImage: 'SignedUrlResponse'
  }
  Post: { // field return type name
    content: 'JSONObject'
    id: 'ID'
    meta: 'PostMeta'
    slug: 'String'
    title: 'String'
  }
  PostMeta: { // field return type name
    description: 'String'
    postId: 'ID'
    title: 'String'
  }
  Publication: { // field return type name
    fromEmail: 'String'
    id: 'ID'
    name: 'String'
    publicUrl: 'String'
  }
  Query: { // field return type name
    getPublications: 'Publication'
    getTags: 'Tag'
  }
  Result: { // field return type name
    status: 'Boolean'
  }
  SignedUrl: { // field return type name
    fields: 'UrlFormField'
    url: 'String'
  }
  Tag: { // field return type name
    approved: 'Boolean'
    description: 'String'
    id: 'ID'
    name: 'String'
    slug: 'String'
  }
  UrlFormField: { // field return type name
    key: 'String'
    value: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addAdministrator: { // args
      admin: NexusGenInputs['UserInput']; // UserInput!
    }
    addMemberToPublication: { // args
      user: NexusGenInputs['UserInput']; // UserInput!
    }
    approveTag: { // args
      approved: boolean; // Boolean!
      tagId: string; // ID!
    }
    authenticateUser: { // args
      input: NexusGenInputs['TokenInput']; // TokenInput!
    }
    createAssetSource: { // args
      source: NexusGenInputs['AssetSourceInput']; // AssetSourceInput!
    }
    createPost: { // args
      post: NexusGenInputs['PostInput']; // PostInput!
      tags: string[]; // [ID!]!
    }
    createPublication: { // args
      input: NexusGenInputs['NewPublicationInput']; // NewPublicationInput!
    }
    createTag: { // args
      tag: NexusGenInputs['TagInput']; // TagInput!
    }
    deletePost: { // args
      postId: string; // ID!
    }
    forgotPassword: { // args
      username: string; // String!
    }
    initialize: { // args
      admin: NexusGenInputs['UserInput']; // UserInput!
      password: string; // String!
    }
    resetPassword: { // args
      code: string; // String!
      password: string; // String!
    }
    updateAppConfig: { // args
      config: NexusGenInputs['AppConfigInput']; // AppConfigInput!
    }
    updatePost: { // args
      post: NexusGenInputs['PostInput']; // PostInput!
      postId: string; // ID!
      tags: string[]; // [ID!]!
    }
    updateTag: { // args
      tag: NexusGenInputs['TagInput']; // TagInput!
      tagId: string; // ID!
    }
    uploadImage: { // args
      image: NexusGenInputs['ImageInput']; // ImageInput!
    }
  }
  Query: {
    getTags: { // args
      approved: boolean; // Boolean!
      search?: string | null; // String
      skip: number; // Int!
      top: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  AssetSourceResponse: "AppError" | "AssetSource"
  AuthTokenResponse: "AppError" | "AuthToken"
  NewPublicationResponse: "AppError" | "Publication"
  PostResponse: "AppError" | "Post"
  ResultResponse: "AppError" | "Result"
  SignedUrlResponse: "AppError" | "SignedUrl"
  TagResponse: "AppError" | "Tag"
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = keyof NexusGenUnions;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = "AssetSourceResponse" | "AuthTokenResponse" | "NewPublicationResponse" | "PostResponse" | "ResultResponse" | "SignedUrlResponse" | "TagResponse";

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}