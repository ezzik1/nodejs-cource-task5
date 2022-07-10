/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
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
  Artist: { // root type
    bands?: Array<NexusGenRootTypes['Band'] | null> | null; // [Band]
    birthDate?: string | null; // String
    birthPlace?: string | null; // String
    country?: string | null; // String
    firstName?: string | null; // String
    id: string; // ID!
    instruments?: Array<string | null> | null; // [String]
    middleName?: string | null; // String
    secondName?: string | null; // String
  }
  Band: { // root type
    genres?: Array<NexusGenRootTypes['Genre'] | null> | null; // [Genre]
    id: string; // ID!
    members?: Array<string | null> | null; // [String]
    name?: string | null; // String
    origin?: string | null; // String
    website?: string | null; // String
  }
  Genre: { // root type
    country?: string | null; // String
    description?: string | null; // String
    id: string; // ID!
    name?: string | null; // String
    year?: number | null; // Int
  }
  Query: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Artist: { // field return type
    bands: Array<NexusGenRootTypes['Band'] | null> | null; // [Band]
    birthDate: string | null; // String
    birthPlace: string | null; // String
    country: string | null; // String
    firstName: string | null; // String
    id: string; // ID!
    instruments: Array<string | null> | null; // [String]
    middleName: string | null; // String
    secondName: string | null; // String
  }
  Band: { // field return type
    genres: Array<NexusGenRootTypes['Genre'] | null> | null; // [Genre]
    id: string; // ID!
    members: Array<string | null> | null; // [String]
    name: string | null; // String
    origin: string | null; // String
    website: string | null; // String
  }
  Genre: { // field return type
    country: string | null; // String
    description: string | null; // String
    id: string; // ID!
    name: string | null; // String
    year: number | null; // Int
  }
  Query: { // field return type
    ok: boolean; // Boolean!
  }
}

export interface NexusGenFieldTypeNames {
  Artist: { // field return type name
    bands: 'Band'
    birthDate: 'String'
    birthPlace: 'String'
    country: 'String'
    firstName: 'String'
    id: 'ID'
    instruments: 'String'
    middleName: 'String'
    secondName: 'String'
  }
  Band: { // field return type name
    genres: 'Genre'
    id: 'ID'
    members: 'String'
    name: 'String'
    origin: 'String'
    website: 'String'
  }
  Genre: { // field return type name
    country: 'String'
    description: 'String'
    id: 'ID'
    name: 'String'
    year: 'Int'
  }
  Query: { // field return type name
    ok: 'Boolean'
  }
}

export interface NexusGenArgTypes {
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
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
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
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