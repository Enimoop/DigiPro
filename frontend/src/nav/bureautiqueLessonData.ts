import type { LessonData } from "../types/lesson";


export const bureautiqueLessonData: LessonData = {
  lessons: [
    {
      id: "1",
      title: "C’est quoi une extension de fichier ?", // Titre en bleu (#1565c0)
      content: `
<span style="color: #7C3AED;">**C’est comme une étiquette sur une boîte** :</span>

*Lettre* *(rapport.docx)* → Boîte "Document Word".

*Photo* *(vacances.jpg)* → Boîte "Image".

<span style="color: #7C3AED;">**Pourquoi c’est utile ?**</span>
- Votre ordinateur sait **avec quel outil ouvrir la boîte**.
- Exemple : *rapport.docx* = Word, *vacances.jpg* = (lecteur de photos).

<div class="box-danger">

**Attention :** Ne renommez pas *Chat.jpg* en *Chat.mp3* → ça ne deviendra pas une musique !
</div>
      `,
    },

    {
      id: "2",
      title: "📄 Documents et tableaux", // Titre + emoji
      content: `
<div class="box-info">

**Documents texte :**
.txt (Bloc-notes), .docx (Word), .odt (LibreOffice)
</div>

<div class="box-info">

**Tableaux :**
.xlsx (Excel), .ods(LibreOffice), .csv (liste simple)
</div>

<div class="box-info">

**PDF :**
.pdf (document à lire, non modifiable)
</div>
      `,
    },

    {
      id: "3",
      title: "🎵🖼️🎬 Multimédia", // Titre + emojis
      content: `
<div class="box-info">

**Fichiers audio :**
.mp3 (standard), .wav (haute qualité)
</div>

<div class="box-info">

**Images :**
.jpg, .jpeg, .png (arrière-plan transparent), .gif (image animée)
</div>

<div class="box-info">

**Vidéos :**
.mp4 (standard), .avi, .mkv (haute qualité)
</div>
      `,
    },

    {
      id: "4",
      title: "⚠️ Fichiers exécutables (ATTENTION)", // Titre en rouge
      content: `
<span style="color: #7C3AED;">**Programmes et scripts :**</span>

<div class="box-info">

.exe, .msi installateurs de logiciels. 
</div>

<div class="box-info">

.bat, .cmd Exécutent des commandes <span style="color: #e03636;">**(Ne surtout pas ouvrir).**</span>
</div>


<div class="box-danger">

**Règle de sécurité :** ❌ Ne jamais ouvrir un fichier exécutable si vous ne connaissez pas sa source ou ce qu'il fait.
</div>
      `,
    },

    {
      id: "5",
      title: "Afficher les extensions", // Titre en bleu
      content: `
<div class="box-info">

**Sur Windows :**
1. Ouvrez un dossier.
2. Cliquez sur **Affichage** (en haut de la fenêtre) → cochez **Extensions de nom de fichier**.
</div>

<div class="box-info">

**Exemple :**
<span style="color: #1ad927;">Vacances.jpg</span> (sûr)
<span style="color: #e03636;">Document.pdf.exe</span> (dangereux)
</div>
      `,
    },
  ],
  end: {
    redirectTo: "/modules/bureautique/bases/quiz"
  },
} as const;
