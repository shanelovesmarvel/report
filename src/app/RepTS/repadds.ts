export const IDOK: number = 1;
export const IDCANCEL: number = 2;
export const IDABORT: number = 3;
export const IDRETRY: number = 4;
export const IDIGNORE: number = 5;
export const IDYES: number = 6;
export const IDNO: number = 7;
export const IDCONTINUE: number = 11;

export const REPSTDBUTTONBASE: number =                                         IDCONTINUE;

export const IDREPHELP: number =                                         (REPSTDBUTTONBASE + 1);
export const IDCONS: number =                                         (REPSTDBUTTONBASE + 2);
export const IDBROWSE: number =                                         (REPSTDBUTTONBASE + 3);

// In ASK dialogs the static control must use this id.
// Then we can find and set the prompt.
export const IDASK: number =                                         (REPSTDBUTTONBASE + 4);
export const IDSENS: number =                                         (REPSTDBUTTONBASE + 5);

// These are used in wizard like dialogs.
export const IDBACK: number =                                         (REPSTDBUTTONBASE + 6) ;
export const IDNEXT: number =                                         (REPSTDBUTTONBASE + 7) ;
export const IDCANCELBN: number =                                         (REPSTDBUTTONBASE + 8) ;