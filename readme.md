# Async Ninja

### Før i begynder at kode:
**Hvilke filer skal projektet have?**

- app.js (routing til serveren)
- EventEmitter.js (håndtering af events)
- reader.js (læser data fra en fil)
- writer.js (skriver data til en fil)
- bin/www (starter serveren)
- data.json (datafil)
- package.json (dependencies)

**Hvor håndteres routes?**
- i app.js

**Hvor anvendes async/await?**
- I reader.js og writer.js, når der læses fra og skrives til filer.

**Hvor håndteres fejl?**
- I reader.js og writer.js, hvor der håndteres fejl ved læsning og skrivning til filer.
- app.js håndterer også fejl, hvis der opstår en fejl i routing.

**Hvilket event skal udsendes?**
- Et event skal udsendes, når data er blevet læst fra filen i reader.js.
- Et event skal udsendes, når data er blevet skrevet til filen i writer.js.

**Hvad skal loggen indeholde?**
- tidsstempel for hvornår data blev læst eller skrevet
- om der er blevet læst eller skrevet data
- hvilken fil der blev læst fra eller skrevet til

**Hvordan vil I teste fejlforløbet?**
- Postman

**Hvad laver programmet?**

Programmet er en lille Express-server (Node.js), der læser fra og skriver til en JSON-fil (`data/data.json`) via to endpoints:
- `GET /reader` læser filen og returnerer indholdet.
- `POST /writer` modtager `{ "content": "..." }` som JSON og gemmer teksten i filen. Hvis `content` mangler eller ikke er tekst, svarer serveren med `400`.

Fil-operationerne bruger `async/await`. Hvis læsning eller skrivning fejler, svarer serveren med `500` og en fejlbesked.

Efter hver vellykket læsning eller skrivning udsender serveren eventet `file-access` via en `EventEmitter` (`EventEmitter.js`). En listener fanger eventet og logger tidspunkt, handling (`read`/`write`) og filnavn. Loggen skrives både til konsollen og til `data/log.txt` med `fs.appendFile`.

### Asynkronitet ###

Hvad sker der i Node.js, mens serveren venter på en filoperation 

- Mens serveren venter på en filoperation, fortsætter systemet med at håndtere andre indkommende HTTP-forespørgsler. Node.js bruger en event-loop, som gør det muligt at håndtere flere forespørgsler samtidigt uden at blokere serveren. Når en filoperation (som læsning eller skrivning) er i gang, kan serveren fortsætte med at acceptere og behandle andre forespørgsler, hvilket gør applikationen mere effektiv og responsiv.


### EventEmitter ###

- EventEmitter en en klasse i Node.js der gør det muligt at udsende og modtage/lytte efter kaldte events.
- I dette projekt bruger vi emit i reader.js og writer.js til at udsende events, når der foretages en handling (læs eller skriv)
- Vi lytter efter disse events i app.js med emitter.on, som kører noget kode, når eventet bliver udsent. Her logger vi også til en fil og console.

### Test ###
- vi testede for succes of fejl ved at bruge Postman til at sende GET og POST requests til serveren.
- Vi prøvede også at slette data.json filen og mappen, for at sikre at de korrekte fejlmeddelelser og koder blev returneret.

### AI-brug ###
- Vi brugte AI til at implementere event emitteren.
- Vi lavede et issue med kravspecifikationer, og bad Claude Code om at /plan en implementering.
- Claudes første plan havde ikke appendfile med, så det bad vi om at få tilføjet.
- Derudover gjorde vi det klart for Claude, at vi ønsked både console.log og appendfile - men også at koden skulle være simpel og let læselig.



Den vigtigste forskel mellem den måde, vi håndterede samtidighed på i vores Java-server, og den måde Node.js-serveren arbejder på, er at vi med java-servere kunne håndtere flere tråde - hvorimod Node.js bruger en enkelt tråd med en event-loop til at håndtere samtidighed.