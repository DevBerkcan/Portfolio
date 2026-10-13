/**
 * Intro-Merker pro Tab-Sitzung. Bewusst kein "use client": das Layout (Server Component)
 * braucht den Script-Text als echten String, nicht als Client-Referenz.
 */
export const INTRO_STORAGE_KEY = "intro-played";

/** Läuft im <head> vor dem ersten Paint und markiert <html>, damit CSS den Preloader gar nicht erst zeigt. */
export const introInlineScript = `try{if(sessionStorage.getItem("${INTRO_STORAGE_KEY}"))document.documentElement.dataset.intro="played"}catch(e){}`;
