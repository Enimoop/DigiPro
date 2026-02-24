import type { LessonData } from "../types/lesson";


export const bureautiqueLessonData: LessonData = {
  lessons: [
    {
      id: "1",
      title: "C’est quoi une extension ?", // Titre en bleu (#1565c0)
      content: `
**C’est comme une étiquette sur une boîte** :
- <span style="color: #1565c0;">*Lettre.**docx*</span> → Boîte "Document Word".
- <span style="color: #1565c0;">*Photo.**jpg*</span> → Boîte "Image".

**Pourquoi c’est utile ?**
→ Votre ordinateur sait **avec quel outil ouvrir la boîte**.
→ Exemple : *.docx* = ciseaux (Word), *.mp3* = tournevis (lecteur musique).

**:warning: Attention :**
<span style="color: #c62828;">Ne renommez pas *Chat.**jpg* en *Chat.**mp3* → ça ne deviendra pas une musique !</span>
      `,
    },

    {
      id: "2",
      title: "📄 Documents et tableaux", // Titre + emoji
      content: `
**Documents texte :**
<span style="color: #2e7d32;">.txt</span> (Bloc-notes), <span style="color: #2e7d32;">.docx</span> (Word), <span style="color: #2e7d32;">.odt</span> (LibreOffice)

**Tableaux :**
<span style="color: #2e7d32;">.xlsx</span> (Excel), <span style="color: #2e7d32;">.ods</span> (LibreOffice), <span style="color: #2e7d32;">.csv</span> (liste simple)

**PDF :**
<span style="color: #2e7d32;">.pdf</span> (document à lire, non modifiable)
      `,
    },

    {
      id: "3",
      title: "🎵🖼️🎬 Multimédia", // Titre + emojis
      content: `
**Fichiers audio :**
<span style="color: #2e7d32;">.mp3</span>, <span style="color: #2e7d32;">.wav</span>

**Images :**
<span style="color: #2e7d32;">.jpg</span>, <span style="color: #2e7d32;">.png</span>, <span style="color: #2e7d32;">.gif</span>

**Vidéos :**
<span style="color: #2e7d32;">.mp4</span>, <span style="color: #2e7d32;">.mkv</span>, <span style="color: #2e7d32;">.avi</span>
      `,
    },

    {
      id: "4",
      title: "⚠️ Fichiers exécutables (ATTENTION)", // Titre en rouge
      content: `
**Programmes et scripts :**
<span style="color: #c62828;">.exe</span>, <span style="color: #c62828;">.msi</span> Installeurs de logiciels. 
<span style="color: #c62828;">.bat</span>, <span style="color: #c62828;">.cmd</span> Exécutent des commandes <span style="color: #c62828;">**(Ne surtout pas ouvrir).**</span>

**Règle de sécurité :**
<span style="color: #c62828;">❌ Ne jamais ouvrir un fichier exécutable si tu ne connais pas sa source ou ce qu'il fait.</span>
      `,
    },

    {
      id: "5",
      title: "Afficher les extensions", // Titre en bleu
      content: `
**Sur Windows :**
1. Ouvre un dossier.
2. Clique sur **Affichage** → coche **Extensions de nom de fichier**.

**Exemple :**
<span style="color: #2e7d32;">✔ Vacances.jpg</span> (sûr)
<span style="color: #c62828;">❌ Document.pdf.exe</span> (dangereux)
      `,
    },
  ],
  end: {
    redirectTo: "/modules/bureautique/bases/quiz"
  },
} as const;
