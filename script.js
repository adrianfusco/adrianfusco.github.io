/**
 * @author Adrian Fusco
 */

/*
    Bash text simulation
*/

const firstText = '$ echo \'Hello world\'';
const secondText = 'Hello world';

var destinationElement;

// Re execute all code inside:
let reExecutionTimer = setTimeout(function tick() {
  destinationElement = document.getElementById('text-terminal');
  // If the element doesn't exist, we don't want to continue executing code:
  if (destinationElement == null) {
    return {
      error: false,
    };
  }

  // Write text into an element char by char
  let charPosition = 0; let timeInterval;
  timeInterval = window.setInterval(function () {
    destinationElement.innerHTML += firstText.charAt(charPosition++);
    if (charPosition > firstText.length) {
      linebreak = document.createElement('br');
      destinationElement.appendChild(linebreak);
      content = document.createTextNode(secondText);
      destinationElement.appendChild(content);
      window.clearInterval(timeInterval);
    }
  }, 50);
  // Clear element
  destinationElement.innerHTML = '';

  reExecutionTimer = setTimeout(tick, 2000);
}, 2000);

/*
    Change language based on user choice
*/

// This is an about me website, just that. We don't need nothing more complex than this for having different languages
const languages = {
  'en': {
    'welcomeText': `
        <p>Hey! :) I'm Adri, a Software Engineer with a strong DevOps background.</p>

        <p>I started my journey as a web PHP Backend Developer working on several frameworks and then continued to the world of Linux services automation using Perl and Python.</p>

        <p>As my career progressed, I transitioned into a software engineer, simultaneously working on diverse projects including automation, monitoring, CI/CD, testing among others.</p>

        <p>Beyond coding, I have a passion for traveling and food, and I love to immerse myself in different cultures. This enthusiasm extends to languages, as I fluently speak Español, English, Galego, Italiano, and now learning some Turkçe.</p>

        <p>In every project I work on, I bring not only technical proficiency but also a commitment to speed and efficiency.</p>

        <p>Let's connect and explore new possibilities!</p>
      `,
    'resumeText': 'CV / Resume',
  },
  'es': {
    'welcomeText': `
        <p>¡Hola! :) Soy Adri, Software Engineer con un sólido background en DevOps.</p>

        <p>Comencé mi trayectoria como Desarrollador Backend de PHP trabajando con varios frameworks y luego continué en el mundo de la automatización de servicios de Linux utilizando Perl y Python.</p>

        <p>A medida que avanzaba en mi carrera, hice la transición a Software Engineer, trabajando simultáneamente en proyectos diversos, incluyendo automatización, monitoring, CI/CD, testing, entre otros.</p>

        <p>Más allá de programar, tengo pasión por viajar y la comida, y me encanta sumergirme en diferentes culturas. Este entusiasmo se extiende a los idiomas, hablando fluidamente Español, Inglés, Galego, Italiano, y aprendiendo un poco de Turkçe.</p>

        <p>En cada proyecto en el que trabajo, aporto competencia técnica y también un compromiso con velocidad y eficiencia.</p>

        <p>¡Conectemos y exploremos nuevas posibilidades!</p>
      `,
    'resumeText': 'CV / Resumen',
  },
  'ga': {
    'welcomeText': `
        <p>Ola! :) Son Adri, un Software Engineer con forte experiencia en DevOps.</p>

        <p>Inicieime na miña traxectoria como Desenvolvedor Backend de PHP traballando en varios frameworks e despois continuei no mundo da automatización de servizos Linux usando Perl e Python.</p>

        <p>Á medida que avanzou a miña carreira, transitei a Software Engineer, traballando simultaneamente en proxectos diversos, incluíndo automatización, monitorización, CI/CD, testing entre outros.</p>

        <p>Máis aló do código, gústame viaxar e pola comida, e encántame aprender sobre diferentes culturas. Este entusiasmo esténdese ás linguas, falando con fluidez Español, Inglés, Galego, Italiano, e agora estou a aprender algo de Turkçe.</p>

        <p>En cada proxecto no que traballo, aporto non só competencia técnica, senón tamén un compromiso con velocidade e eficiencia.</p>

        <p>Conectémonos e exploremos novas posibilidades!</p>
    `,
    'resumeText': 'CV / Resumo',
  },
};

// Put english language by default
document.getElementById('welcomeText').innerHTML = languages['en']['welcomeText'];
document.getElementById('resumeText').innerHTML = languages['en']['resumeText'];

// Change language based on the user choice and the text received by the attribute 'language'
function changeLanguage(element) {
  languageSelected = element.getAttribute('language');
  Object.keys(languages).forEach((languageKey) => {
    if (languageSelected === languageKey) {
      Object.keys(languages[languageKey]).forEach((key) => {
        document.getElementById(key).innerHTML = languages[languageKey][key];
      });
    }
  });
}
