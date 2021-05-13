/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { Context } from "./src/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  NewBlogInput: { // input type
    firstUser?: NexusGenInputs['UserInput'] | null; // UserInput
    fromEmail: string; // String!
    name: string; // String!
    publicUrl: string; // String!
  }
  UserInput: { // input type
    email: string; // String!
    firstName: string; // String!
    lastName: string; // String!
    password: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Blog: { // root type
    fromEmail: string; // String!
    id: string; // ID!
    name: string; // String!
    publicUrl: string; // String!
  }
  Error: { // root type
    code: string; // String!
    message: string; // String!
  }
  ErrorList: { // root type
    errors: NexusGenRootTypes['Error'][]; // [Error!]!
  }
  Mutation: {};
  Query: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
  CreateBlogResponse: NexusGenRootTypes['Blog'] | NexusGenRootTypes['ErrorList'];
}

export type NexusGenRootTypes = NexusGenObjects & NexusGenUnions

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Blog: { // field return type
    fromEmail: string; // String!
    id: string; // ID!
    name: string; // String!
    publicUrl: string; // String!
  }
  Error: { // field return type
    code: string; // String!
    message: string; // String!
  }
  ErrorList: { // field return type
    errors: NexusGenRootTypes['Error'][]; // [Error!]!
  }
  Mutation: { // field return type
    createBlog: NexusGenRootTypes['CreateBlogResponse']; // CreateBlogResponse!
  }
  Query: { // field return type
    getBlogs: NexusGenRootTypes['Blog'][]; // [Blog!]!
  }
}

export interface NexusGenFieldTypeNames {
  Blog: { // field return type name
    fromEmail: 'String'
    id: 'ID'
    name: 'String'
    publicUrl: 'String'
  }
  Error: { // field return type name
    code: 'String'
    message: 'String'
  }
  ErrorList: { // field return type name
    errors: 'Error'
  }
  Mutation: { // field return type name
    createBlog: 'CreateBlogResponse'
  }
  Query: { // field return type name
    getBlogs: 'Blog'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createBlog: { // args
      input: NexusGenInputs['NewBlogInput']; // NewBlogInput!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  CreateBlogResponse: "Blog" | "ErrorList"
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = keyof NexusGenUnions;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = "CreateBlogResponse";

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