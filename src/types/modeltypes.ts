export type GesangbuchliedDB = {
  id: string;
  titel: string;
  textId: TextType;
  melodieId: MelodieType;
  kategorieId: KategorieType[];
};

// create Gesangbuchlied type that extends GesangbuchliedDB and adds fields for filtering
export type Gesangbuchlied = GesangbuchliedDB & {
  titelLowerCase: string;
  authorStrings: string;
  kategorieStrings: string;
};

export type TextDB = {
  strophenEinzeln: Strophe[];
  autorId: AutorType[];
};

export type TextType = TextDB & {
  authors_string: string;
};

export type Strophe = {
  strophe: string;
};

export type AutorDB = {
  autor_id: AutorDetails;
};

export type AutorType = AutorDB & {
  name: string;
};

export type AutorDetails = {
  vorname: string;
  nachname: string;
  sterbejahr: number;
};

export type ABCMelodie = {
  name: string;
  abc_notation: string;
  is_default: boolean;
  file_id?: string;
};

export type MelodieDB = {
  abc_melodie?: ABCMelodie[];
  autorId: AutorType[];
  noten: Noten[];
};

export type MelodieType = MelodieDB & {
  authors_string: string;
};

export type Noten = {
  directus_files_id: DirectusFile;
};

export type DirectusFile = {
  filename_download: string;
  id: string;
};

export type KategorieType = {
  kategorie_id: {
    name: string;
  };
};
