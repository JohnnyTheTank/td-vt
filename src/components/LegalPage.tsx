import { personalInfo } from '../data/career'
import './LegalPage.css'

interface LegalPageProps {
  type: 'datenschutz' | 'impressum'
  onBack: () => void
}

function LegalPage({ type, onBack }: LegalPageProps) {
  return (
    <div className="legal-page">
      <button onClick={onBack} className="legal-back-button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Zurück
      </button>

      <div className="legal-content">
        {type === 'impressum' ? <Impressum /> : <Datenschutz />}
      </div>
    </div>
  )
}

function Impressum() {
  return (
    <article className="legal-article">
      <h1>Impressum</h1>

      <section>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          {personalInfo.name}
          <br />
          Büburgstraße 1
          <br />
          85232 Bergkirchen
        </p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          Telefon: {personalInfo.phone}
          <br />
          E-Mail: {personalInfo.email}
        </p>
      </section>

      <section>
        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          {personalInfo.name}
          <br />
          Büburgstraße 1
          <br />
          85232 Bergkirchen
        </p>
      </section>

      <section>
        <h2>Haftungsausschluss</h2>

        <h3>Haftung für Inhalte</h3>
        <p>
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
          Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
          jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7
          Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
          gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
          forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>

        <h3>Haftung für Links</h3>
        <p>
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
          Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich.
        </p>

        <h3>Urheberrecht</h3>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers.
        </p>
      </section>
    </article>
  )
}

function Datenschutz() {
  return (
    <article className="legal-article">
      <h1>Datenschutzerklärung</h1>

      <section>
        <h2>1. Datenschutz auf einen Blick</h2>

        <h3>Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit
          Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
          Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
          identifiziert werden können.
        </p>

        <h3>Datenerfassung auf dieser Website</h3>
        <p>
          <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
          <br />
          Die Datenverarbeitung auf dieser Website erfolgt durch den
          Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser
          Website entnehmen.
        </p>

        <p>
          <strong>Wie erfassen wir Ihre Daten?</strong>
          <br />
          Diese Website erfasst keine personenbezogenen Daten durch Formulare oder
          ähnliche Eingabemöglichkeiten. Ihre Daten werden ausschließlich technisch
          erfasst, wenn Sie die Website besuchen. Das sind vor allem technische
          Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des
          Seitenaufrufs).
        </p>

        <p>
          <strong>Wofür nutzen wir Ihre Daten?</strong>
          <br />
          Die technischen Daten werden erhoben, um eine fehlerfreie Bereitstellung
          der Website zu gewährleisten.
        </p>
      </section>

      <section>
        <h2>2. Verantwortlicher</h2>
        <p>
          Verantwortlicher für die Datenverarbeitung auf dieser Website ist:
        </p>
        <p>
          {personalInfo.name}
          <br />
          Büburgstraße 1
          <br />
          85232 Bergkirchen
          <br />
          <br />
          Telefon: {personalInfo.phone}
          <br />
          E-Mail: {personalInfo.email}
        </p>
      </section>

      <section>
        <h2>3. Hosting</h2>
        <p>
          Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf
          dieser Website erfasst werden, werden auf den Servern des Hosters
          gespeichert. Hierbei kann es sich v.a. um IP-Adressen, Kontaktanfragen,
          Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen,
          Websitezugriffe und sonstige Daten, die über eine Website generiert
          werden, handeln.
        </p>
      </section>

      <section>
        <h2>4. Ihre Rechte</h2>
        <p>
          Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft,
          Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu
          erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung
          dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur
          Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit
          für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter
          bestimmten Umständen die Einschränkung der Verarbeitung Ihrer
          personenbezogenen Daten zu verlangen.
        </p>
        <p>
          Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich
          jederzeit an uns wenden.
        </p>
      </section>

      <section>
        <h2>5. Server-Log-Dateien</h2>
        <p>
          Der Provider der Seiten erhebt und speichert automatisch Informationen in
          so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns
          übermittelt. Dies sind:
        </p>
        <ul>
          <li>Browsertyp und Browserversion</li>
          <li>verwendetes Betriebssystem</li>
          <li>Referrer URL</li>
          <li>Hostname des zugreifenden Rechners</li>
          <li>Uhrzeit der Serveranfrage</li>
          <li>IP-Adresse</li>
        </ul>
        <p>
          Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht
          vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6
          Abs. 1 lit. f DSGVO.
        </p>
      </section>

      <section>
        <h2>6. Cookies</h2>
        <p>
          Diese Website verwendet keine Cookies für Tracking- oder Analysezwecke.
          Es werden lediglich technisch notwendige Informationen verarbeitet, die
          für den Betrieb der Website erforderlich sind.
        </p>
      </section>

      <section>
        <h2>7. Analyse-Tools und Werbung</h2>
        <p>
          Diese Website verwendet keine Analyse-Tools und keine Werbung von
          Drittanbietern.
        </p>
      </section>
    </article>
  )
}

export default LegalPage
