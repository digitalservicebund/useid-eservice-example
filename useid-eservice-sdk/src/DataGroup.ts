// DataGroups as defined by TR-03110 part 4, section 2.2.3
// https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03110/BSI_TR-03110_Part-4_V2-2.pdf

export enum DataGroup {
  DocumentType = "DG1",
  IssuingEntity = "DG2",
  DateOfExpiry = "DG3",
  GivenNames = "DG4",
  FamilyNames = "DG5",
  NomDePlume = "DG6",
  AcademicTitle = "DG7",
  DateOfBirth = "DG8",
  PlaceOfBirth = "DG9",
  Nationality = "DG10",
  Sex = "DG11",
  OptionalData = "DG12",
  BirthName = "DG13",
  WrittenSignature = "DG14",
  DateOfIssuance = "DG15",
  PlaceOfResidence = "DG17",
  MunicipalID = "DG18",
  ResidencePermitI = "DG19",
  ResidencePermitII = "DG20",
  PhoneNumber = "DG21",
  EMailAddress = "DG22",
}
