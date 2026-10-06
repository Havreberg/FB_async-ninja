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

