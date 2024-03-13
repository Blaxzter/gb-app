export type GesangbuchliedDB = {
  id: string;
  titel: string;
  textId: Text;
  melodieId: Melodie;
  kategorieId: Kategorie[];
};

// create Gesangbuchlied type that extends GesangbuchliedDB and adds fields for filtering
export type Gesangbuchlied = GesangbuchliedDB & {
  titelLowerCase: string;
  authorStrings: string;
  kategorieStrings: string;
};

export type TextDB = {
  strophenEinzeln: Strophe[];
  autorId: Autor[];
};

export type Text = TextDB & {
  authors_string: string;
};

export type Strophe = {
  strophe: string;
};

export type AutorDB = {
  autor_id: AutorDetails;
};

export type Autor = AutorDB & {
  name: string;
};

export type AutorDetails = {
  vorname: string;
  nachname: string;
  sterbejahr: number;
};

export type MelodieDB = {
  autorId: Autor[];
  noten: Noten[];
};

export type Melodie = MelodieDB & {
  authors_string: string;
};

export type Noten = {
  directus_files_id: DirectusFile;
};

export type DirectusFile = {
  filename_download: string;
  id: string;
};

export type Kategorie = {
  kategorie_id: {
    name: string;
  };
};
