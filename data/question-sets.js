/* =========================================================
   question-sets.js
   Gatavie jautājumu krājumi. Katrā krājumā ir 5 kategorijas,
   katrā kategorijā 5 jautājumi (100 līdz 500 punkti).
   Dati ir JS failā (nevis JSON), lai spēle strādātu arī tad,
   ja index.html atver tieši no mapes bez servera.
   ========================================================= */

window.QUESTION_SETS = {

  /* ---------- Krājums "Latvija" ---------- */
  latvija: {
    title: "Latvija",
    description: "Vēsture, daba, kultūra un tradīcijas.",
    level: "Viegls",
    categories: [
      {
        name: "Vēsture",
        questions: [
          { q: "Kurā gadā tika proklamēta Latvijas Republika?", a: "1918. gadā (18. novembrī)" },
          { q: "Kā sauc 1989. gada akciju, kad cilvēki sadevās rokās no Tallinas līdz Viļņai?", a: "Baltijas ceļš" },
          { q: "Kurā gadā Latvija iestājās Eiropas Savienībā?", a: "2004. gadā" },
          { q: "Kurš bija pirmais Latvijas Valsts prezidents?", a: "Jānis Čakste" },
          { q: "Kurā gadā un mēnesī Rīgā notika barikādes?", a: "1991. gada janvārī" }
        ]
      },
      {
        name: "Ģeogrāfija",
        questions: [
          { q: "Kā sauc Latvijas augstāko virsotni?", a: "Gaiziņkalns" },
          { q: "Kura ir garākā upe, kas tek tikai pa Latvijas teritoriju?", a: "Gauja" },
          { q: "Kurā Latvijas vēsturiskajā novadā atrodas Jelgava?", a: "Zemgalē" },
          { q: "Ar kurām četrām valstīm Latvijai ir sauszemes robeža?", a: "Igauniju, Lietuvu, Krieviju un Baltkrieviju" },
          { q: "Kurš ir Latvijas lielākais ezers pēc platības?", a: "Lubāns" }
        ]
      },
      {
        name: "Kultūra",
        questions: [
          { q: "Kā sauc svētkus, kas notiek reizi piecos gados un ir iekļauti UNESCO sarakstā?", a: "Dziesmu un deju svētki" },
          { q: "Kurš rakstnieks sarakstīja lugu \"Uguns un nakts\"?", a: "Rainis" },
          { q: "Kas sarakstīja romānu \"Mērnieku laiki\"?", a: "Brāļi Kaudzītes (Reinis un Matīss)" },
          { q: "Kurš autors sarakstīja eposu \"Lāčplēsis\"?", a: "Andrejs Pumpurs" },
          { q: "Kurš komponēja Latvijas himnu \"Dievs, svētī Latviju!\"?", a: "Kārlis Baumanis" }
        ]
      },
      {
        name: "Daba",
        questions: [
          { q: "Kurš putns ir Latvijas nacionālais putns?", a: "Baltā cielava" },
          { q: "Kuri divi koki ir Latvijas nacionālie koki?", a: "Ozols un liepa" },
          { q: "Kurš zieds ir Latvijas nacionālais zieds?", a: "Pīpene" },
          { q: "Kurš kukainis ir Latvijas nacionālais kukainis?", a: "Divpunktu mārīte" },
          { q: "Kurš ir Latvijas vecākais nacionālais parks?", a: "Gaujas nacionālais parks (1973)" }
        ]
      },
      {
        name: "Tradīcijas",
        questions: [
          { q: "Kurā datumā svin Jāņu dienu?", a: "24. jūnijā" },
          { q: "Kāds siers ir tradicionāls Jāņu galdā?", a: "Jāņu siers ar ķimenēm" },
          { q: "Kā sauc tradicionālo latviešu stīgu instrumentu?", a: "Kokle" },
          { q: "Kurā datumā atzīmē Lāčplēša dienu?", a: "11. novembrī" },
          { q: "Kurš izveidoja \"Dainu skapi\" tautasdziesmu glabāšanai?", a: "Krišjānis Barons" }
        ]
      }
    ]
  },

  /* ---------- Krājums "Sports" ---------- */
  sports: {
    title: "Sports",
    description: "Futbols, basketbols, hokejs un olimpiskās spēles.",
    level: "Vidējs",
    categories: [
      {
        name: "Futbols",
        questions: [
          { q: "Cik spēlētāju no vienas komandas vienlaikus ir laukumā?", a: "11" },
          { q: "Kura valsts uzvarēja 2022. gada FIFA Pasaules kausā?", a: "Argentīna" },
          { q: "Cik minūtes ilgst viens futbola spēles puslaiks?", a: "45 minūtes" },
          { q: "Kurā gadā Latvijas izlase spēlēja Eiropas čempionāta finālturnīrā?", a: "2004. gadā" },
          { q: "Kurš futbolists ir ieguvis visvairāk \"Zelta bumbu\" balvu?", a: "Lionels Mesi" }
        ]
      },
      {
        name: "Basketbols",
        questions: [
          { q: "Cik punktu dod metiens aiz tālās distances līnijas?", a: "3 punktus" },
          { q: "Kurš Latvijas basketbolists ir pazīstams ar iesauku \"Unicorn\"?", a: "Kristaps Porziņģis" },
          { q: "Kurā gadā Latvijas izlase Pasaules kausā ieguva 5. vietu?", a: "2023. gadā" },
          { q: "Kurā basketbola veidā Latvija ieguva olimpisko zeltu Tokijā?", a: "3x3 basketbolā" },
          { q: "Kurš bija pirmais latvietis, kurš spēlēja NBA?", a: "Gundars Vētra" }
        ]
      },
      {
        name: "Hokejs",
        questions: [
          { q: "Kā sauc melno gumijas disku, ar ko spēlē hokeju?", a: "Ripa" },
          { q: "Kurā gadā Latvijas izlase ieguva bronzu pasaules čempionātā?", a: "2023. gadā" },
          { q: "Kā sauc Rīgas klubu, kas spēlēja KHL no 2008. līdz 2022. gadam?", a: "Rīgas \"Dinamo\"" },
          { q: "Cik minūtes ilgst viena hokeja perioda tīrais laiks?", a: "20 minūtes" },
          { q: "Kurš bija pirmais latvietis, kurš izcīnīja Stenlija kausu?", a: "Sandis Ozoliņš (1996)" }
        ]
      },
      {
        name: "Olimpiskās spēles",
        questions: [
          { q: "Cik apļu ir olimpiskajā simbolā?", a: "5" },
          { q: "Kurā pilsētā notika 2024. gada vasaras olimpiskās spēles?", a: "Parīzē" },
          { q: "Kurā sporta veidā sacenšas Martins Dukurs?", a: "Skeletonā" },
          { q: "Kurš latvietis ieguva olimpisko zeltu BMX 2008. un 2012. gadā?", a: "Māris Štrombergs" },
          { q: "Kurā gadā Latvija pirmo reizi piedalījās olimpiskajās spēlēs?", a: "1924. gadā" }
        ]
      },
      {
        name: "Dažādi",
        questions: [
          { q: "Kura Latvijas tenisiste uzvarēja \"French Open\" 2017. gadā?", a: "Aļona Ostapenko" },
          { q: "Uz kāda seguma spēlē Vimbldonas turnīrā?", a: "Uz zāliena" },
          { q: "Cik setos jāuzvar vīriešiem Grand Slam turnīra spēlē?", a: "Trīs setos" },
          { q: "Cik kilometru garš ir maratons?", a: "42,195 km" },
          { q: "Kurš latviešu šķēpmetējs kļuva par olimpisko čempionu 1968. gadā?", a: "Jānis Lūsis" }
        ]
      }
    ]
  },

  /* ---------- Krājums "Kino un mūzika" ---------- */
  kino: {
    title: "Kino un mūzika",
    description: "Filmas, seriāli, animācija un dziesmas.",
    level: "Vidējs",
    categories: [
      {
        name: "Filmas",
        questions: [
          { q: "Kā sauc burvju skolu Harija Potera filmās?", a: "Cūkkārpa" },
          { q: "Kurš režisors uzņēma filmu \"Titāniks\" (1997)?", a: "Džeimss Kamerons" },
          { q: "Kura latviešu animācijas filma 2025. gadā ieguva \"Oskaru\"?", a: "\"Straume\" (Gints Zilbalodis)" },
          { q: "Kurā filmā skan frāze \"I'll be back\"?", a: "\"Terminators\"" },
          { q: "Kā sauc 1981. gada latviešu komēdiju, kuras darbība notiek Jāņu naktī?", a: "\"Limuzīns Jāņu nakts krāsā\"" }
        ]
      },
      {
        name: "Mūzika",
        questions: [
          { q: "Kura grupa izpildīja dziesmu \"Bohemian Rhapsody\"?", a: "Queen" },
          { q: "Cik stīgu ir parastai ģitārai?", a: "6" },
          { q: "Kuru izpildītāju sauc par \"Popmūzikas karali\"?", a: "Maiklu Džeksonu" },
          { q: "Kura grupa izdeva albumu \"Abbey Road\"?", a: "The Beatles" },
          { q: "Kurš komponists turpināja rakstīt mūziku arī pēc tam, kad zaudēja dzirdi?", a: "Ludvigs van Bēthovens" }
        ]
      },
      {
        name: "Latvijas mūzika",
        questions: [
          { q: "Kura dziedātāja uzvarēja Eirovīzijā 2002. gadā?", a: "Marija Naumova" },
          { q: "Kurš ir grupas \"Prāta Vētra\" solists?", a: "Renārs Kaupers" },
          { q: "Kurš komponēja dziesmu \"Dāvāja Māriņa\"?", a: "Raimonds Pauls" },
          { q: "Kā sauc Latvijas ikgadējo mūzikas ierakstu balvu?", a: "\"Zelta Mikrofons\"" },
          { q: "Kurā vietā \"Brainstorm\" ierindojās Eirovīzijā 2000. gadā?", a: "3. vietā" }
        ]
      },
      {
        name: "Animācija",
        questions: [
          { q: "Kā sauc sniegavīru multfilmā \"Ledus sirds\"?", a: "Olafs" },
          { q: "Kura studija radīja \"Rotaļlietu stāstu\" (Toy Story)?", a: "Pixar" },
          { q: "Kā sauc dzelteno ģimeni no Springfīldas?", a: "Simpsoni" },
          { q: "Kā sauc mazo zivtiņu, kuru meklē tētis Mārlins?", a: "Nemo" },
          { q: "Kurš radīja Mikiju Peli?", a: "Volts Disnejs" }
        ]
      },
      {
        name: "Seriāli",
        questions: [
          { q: "Kurā seriālā darbojas Ross, Reičela un Monika?", a: "\"Draugi\" (Friends)" },
          { q: "Kurā seriālā ķīmijas skolotājs Volters Vaits sāk ražot narkotikas?", a: "\"Breaking Bad\"" },
          { q: "Kā sauc pilsētu, kurā notiek seriāla \"Stranger Things\" darbība?", a: "Hokinsa" },
          { q: "Kā sauc seriālu, kurā dzimtas cīnās par Dzelzs troni?", a: "\"Troņu spēle\"" },
          { q: "Kura straumēšanas platforma izdeva seriālu \"Squid Game\"?", a: "Netflix" }
        ]
      }
    ]
  },

  /* ---------- Krājums "Pasaule" ---------- */
  pasaule: {
    title: "Pasaule",
    description: "Galvaspilsētas, karogi, slavenas vietas un valodas.",
    level: "Vidējs",
    categories: [
      {
        name: "Galvaspilsētas",
        questions: [
          { q: "Kāda ir Francijas galvaspilsēta?", a: "Parīze" },
          { q: "Kāda ir Austrālijas galvaspilsēta?", a: "Kanbera" },
          { q: "Kāda ir Kanādas galvaspilsēta?", a: "Otava" },
          { q: "Kāda ir Turcijas galvaspilsēta?", a: "Ankara" },
          { q: "Kāda ir Brazīlijas galvaspilsēta?", a: "Brazilja" }
        ]
      },
      {
        name: "Ģeogrāfija",
        questions: [
          { q: "Kurš ir lielākais okeāns pasaulē?", a: "Klusais okeāns" },
          { q: "Kurā kontinentā atrodas Sahāras tuksnesis?", a: "Āfrikā" },
          { q: "Kurš ir augstākais kalns pasaulē?", a: "Everests (Džomolungma)" },
          { q: "Kurš ir dziļākais ezers pasaulē?", a: "Baikāls" },
          { q: "Kura ir garākā upe Eiropā?", a: "Volga" }
        ]
      },
      {
        name: "Karogi",
        questions: [
          { q: "Kuras valsts karogā ir sarkans aplis uz balta fona?", a: "Japānas" },
          { q: "Kāda koka lapa attēlota Kanādas karogā?", a: "Kļavas lapa" },
          { q: "Kurai Ziemeļvalstij ir sarkans karogs ar baltu krustu?", a: "Dānijai" },
          { q: "Cik zvaigžņu ir ASV karogā?", a: "50" },
          { q: "Kurai valstij ir nacionālais karogs, kas nav taisnstūra formā?", a: "Nepālai" }
        ]
      },
      {
        name: "Slavenas vietas",
        questions: [
          { q: "Kurā pilsētā atrodas Kolizejs?", a: "Romā" },
          { q: "Kurā valstī atrodas Maču Pikču?", a: "Peru" },
          { q: "Kurā valstī atrodas Tadžmahals?", a: "Indijā" },
          { q: "Kurā pilsētā atrodas Sagrada Familia bazilika?", a: "Barselonā" },
          { q: "Kurā valstī atrodas akmenī izcirstā pilsēta Petra?", a: "Jordānijā" }
        ]
      },
      {
        name: "Valodas un valūtas",
        questions: [
          { q: "Kāda valūta ir Latvijā?", a: "Eiro" },
          { q: "Kāda ir Japānas valūta?", a: "Jena" },
          { q: "Kurā Dienvidamerikas valstī runā portugāļu valodā?", a: "Brazīlijā" },
          { q: "Cik oficiālo valodu ir Šveicē?", a: "Četras (vācu, franču, itāļu, retoromāņu)" },
          { q: "Kura valoda ir dzimtā valoda visvairāk cilvēkiem pasaulē?", a: "Ķīniešu (mandarīnu) valoda" }
        ]
      }
    ]
  },

  /* ---------- Krājums "Zinātne un tehnoloģijas" ---------- */
  zinatne: {
    title: "Zinātne un tehnoloģijas",
    description: "Kosmoss, ķīmija, fizika, datori un izgudrojumi.",
    level: "Vidējs",
    categories: [
      {
        name: "Kosmoss",
        questions: [
          { q: "Kura planēta ir vistuvāk Saulei?", a: "Merkurs" },
          { q: "Kura ir lielākā planēta Saules sistēmā?", a: "Jupiters" },
          { q: "Kurš bija pirmais cilvēks kosmosā?", a: "Jurijs Gagarins (1961)" },
          { q: "Kurā gadā cilvēks pirmo reizi nolaidās uz Mēness?", a: "1969. gadā" },
          { q: "Cik aptuveni minūšu Saules gaisma ceļo līdz Zemei?", a: "Apmēram 8 minūtes" }
        ]
      },
      {
        name: "Ķīmija",
        questions: [
          { q: "Kāda ir ūdens ķīmiskā formula?", a: "H2O" },
          { q: "Kāds ir zelta ķīmiskais simbols?", a: "Au" },
          { q: "Kura gāze veido lielāko daļu Zemes atmosfēras?", a: "Slāpeklis" },
          { q: "Kurš izveidoja ķīmisko elementu periodisko tabulu?", a: "Dmitrijs Mendeļejevs" },
          { q: "Kurš ir vienīgais metāls, kas istabas temperatūrā ir šķidrs?", a: "Dzīvsudrabs" }
        ]
      },
      {
        name: "Fizika",
        questions: [
          { q: "Cik grādos pēc Celsija ūdens vārās jūras līmenī?", a: "100 °C" },
          { q: "Kuram zinātniekam, pēc leģendas, uz galvas nokrita ābols?", a: "Īzakam Ņūtonam" },
          { q: "Kādās mērvienībās mēra elektrisko spriegumu?", a: "Voltos" },
          { q: "Kurš ir autors formulai E = mc²?", a: "Alberts Einšteins" },
          { q: "Cik aptuveni kilometru sekundē ir gaismas ātrums vakuumā?", a: "Apmēram 300 000 km/s" }
        ]
      },
      {
        name: "Datori",
        questions: [
          { q: "Kurš uzņēmums izstrādā operētājsistēmu Windows?", a: "Microsoft" },
          { q: "Ko nozīmē saīsinājums \"www\"?", a: "World Wide Web (globālais tīmeklis)" },
          { q: "Kuru valodu izmanto tīmekļa lapu struktūras veidošanai?", a: "HTML" },
          { q: "Kurā gadā tika dibināts uzņēmums Google?", a: "1998. gadā" },
          { q: "Kurš izgudroja globālo tīmekli (WWW)?", a: "Tims Berners-Lī" }
        ]
      },
      {
        name: "Izgudrojumi",
        questions: [
          { q: "Kurš patentēja tālruni 1876. gadā?", a: "Aleksandrs Grehems Bells" },
          { q: "Kurš izgudroja mazo fotoaparātu \"Minox\", ko ražoja VEF Rīgā?", a: "Valters Caps" },
          { q: "Kurš atklāja penicilīnu?", a: "Aleksandrs Flemings" },
          { q: "Kurā valstī tika izgudrots papīrs?", a: "Ķīnā" },
          { q: "Kurš Eiropā ieviesa grāmatu iespiešanu ar kustīgiem burtiem?", a: "Johans Gūtenbergs" }
        ]
      }
    ]
  },

  /* ---------- Krājums "Ēdiens un dzērieni" ---------- */
  ediens: {
    title: "Ēdiens un dzērieni",
    description: "Latviešu un pasaules virtuve, dzērieni un saldumi.",
    level: "Viegls",
    categories: [
      {
        name: "Latviešu virtuve",
        questions: [
          { q: "Kā sauc mīklas izstrādājumus ar speķa un sīpolu pildījumu?", a: "Pīrāgi" },
          { q: "No kādiem miltiem cep rupjmaizi?", a: "No rudzu miltiem" },
          { q: "Kādu ēdienu ar speķi tradicionāli ēd Ziemassvētkos?", a: "Pelēkos zirņus ar speķi" },
          { q: "Kā sauc vasaras zupu ar bietēm un kefīru?", a: "Aukstā zupa" },
          { q: "Kā sauc desertu no rupjmaizes drupačām, putukrējuma un ievārījuma?", a: "Rupjmaizes kārtojums" }
        ]
      },
      {
        name: "Pasaules virtuves",
        questions: [
          { q: "No kuras valsts nāk pica?", a: "No Itālijas" },
          { q: "Kā sauc japāņu ēdienu no rīsiem un jēlas zivs?", a: "Suši" },
          { q: "Kurā valstī radušies tako?", a: "Meksikā" },
          { q: "Kā sauc spāņu rīsu ēdienu, ko gatavo lielā pannā?", a: "Paelja" },
          { q: "Kā sauc ungāru gaļas ēdienu ar papriku?", a: "Gulašs" }
        ]
      },
      {
        name: "Augļi un garšvielas",
        questions: [
          { q: "Kādā krāsā ir nogatavojies banāns?", a: "Dzeltenā" },
          { q: "Vai tomāts botāniski ir auglis vai dārzenis?", a: "Auglis (oga)" },
          { q: "Kurš auglis ir galvenā guakamoles sastāvdaļa?", a: "Avokado" },
          { q: "No kā gatavo šokolādi?", a: "No kakao pupiņām" },
          { q: "Kura garšviela ir dārgākā pasaulē pēc svara?", a: "Safrāns" }
        ]
      },
      {
        name: "Dzērieni",
        questions: [
          { q: "No kā gatavo melno un zaļo tēju?", a: "No tējas krūma lapām" },
          { q: "No kā gatavo tradicionālo kvasu?", a: "No rudzu maizes" },
          { q: "Kā sauc dzērienu no espresso un karsta ūdens?", a: "Amerikāno" },
          { q: "Kurā valstī, pēc leģendas, tika atklāta kafija?", a: "Etiopijā" },
          { q: "Kurā valstī atrodas Šampaņas reģions?", a: "Francijā" }
        ]
      },
      {
        name: "Saldumi",
        questions: [
          { q: "Kuri kukaiņi ražo medu?", a: "Bites" },
          { q: "Kurā pilsētā atrodas konfekšu fabrika \"Laima\"?", a: "Rīgā" },
          { q: "Kā sauc plānās franču pankūkas?", a: "Krēpi" },
          { q: "Kā sauc itāļu desertu ar kafijā mērcētiem cepumiem un maskarponi?", a: "Tiramisu" },
          { q: "Kā sauc slaveno Vīnes šokolādes torti ar aprikožu ievārījumu?", a: "Zahera torte" }
        ]
      }
    ]
  }
};
