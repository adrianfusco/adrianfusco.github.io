/**
 * @author Adrian Fusco
 */

/*
    Bash text simulation
*/

const firstText = "$ echo 'Hello world'"
const secondText = "Hello world"

var destinationElement;

// Re execute all code inside:
let reExecutionTimer = setTimeout(function tick() {
    destinationElement = document.getElementById("text-terminal");
    // If the element doesn't exist, we don't want to continue executing code:
    if (destinationElement == null) {
        return {
            error: false
        };
    }

    // Write text into an element char by char
    var charPosition = 0, timeInterval;
    timeInterval = window.setInterval(function () {
        destinationElement.innerHTML += firstText.charAt(charPosition++);
        if (charPosition > firstText.length) {
            linebreak = document.createElement("br");
            destinationElement.appendChild(linebreak);
            content = document.createTextNode(secondText);
            destinationElement.appendChild(content);
            window.clearInterval(timeInterval)
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
    "en": {
        "welcomeText": `
        <p>I've been working on the backend development side for more than three years.</p>

        <p>In order to automate the interaction with many services like Xen, KVM, Nginx, Apache, SSL, Restic, Ceph, ELK,
        etc., I began working mostly with the Perl programming language to create new modules. I used PHP and Python
        after a significant transition in technology and services, which gave me the chance to learn a lot and mature.</p>

        <p>I made a significant adjustment more than a year ago when I joined Red Hat <i class="fab fa-redhat fa-lg"></i></p>

        <p>I'm now collaborating with the Code Reliability Engineering team to enhance the upstream and downstream CI
        systems of the Openstack architecture using different tools, programming languages and services as Grafana,
        InfluxDB, Telegraf, ELK, Filebeat, Go, Python and also some contributions into the Openshift project
        generating k8s operators for some Openstack components.</p>

        <p>I started contributing to the Open Source community</p>
        `,
        "resumeText": "CV / Resume"
    },
    "es": {
        "welcomeText": `
            <p>He trabajado en el área de desarrollo backend for más de 3 años.</p>

            <p>Comencé trabajando principalmente con el lenguaje de programación Perl creando nuevos módulos para automatizar
            la interacción con distintos servicios como Xen, KVM, Nginx, Apache, SSL, Restic, Ceph, ELK,
            etc. Gracias a una migración de toda la infraestructura tuve la oportunidad de realizar migraciones 
            de todos estos módulos usando PHP y Python principalmente.</p>

            <p>Hace más de un año hice un gran cambio cuando me uní a Red Hat <i class="fab fa-redhat fa-lg"></i></p>

            <p>Me encuentro colaborando con el equipo de Code Reliability Engineering realizando mejoras en el sistema de CI
            de Openstack tanto en upstream como en downstream usando distintas herramientas, lenguajes de programación y
            servicios como Grafana, InfluxDB, Telegraf, ELK, Filebeat, Go, Python además de realizar algunas contribuciones
            al proyecto de Openshift generando algunos operators en k8s para componentes de Openstack.</p>

            <p>He comenzado a contribuir a la comunidad Open Source.</p>
        `,
        "resumeText": "CV / Resumen"
    },
    "ga": {
        "welcomeText": `
        <p>Traballei na área de desenvolvemento backend por máis de 3 anos.

        <p>Comecei traballando principalmente coa linguaxe de programación Perl creando novos módulos para automatizar
        a interacción con distintos servizos como Xen, KVM, Nginx, Apache, SSL, Restic, Ceph, ELK,
        etc. Grazas a unha migración de toda a infraestrutura tiven a oportunidade de realizar migracións
        de todos estes módulos usando PHP e Python principalmente. </p>

        <p>Fai máis dun ano fixen un gran cambio cando me unín a Red Hat <i class="fab fa-redhat fa-lg"></i> </p>

        <p>Atópome colaborando co equipo de Code Reliability Engineering realizando melloras no sistema de CI
        de Openstack tanto en upstream como en downstream usando distintas ferramentas, linguaxes de programación e
        servizos como Grafana, InfluxDB, Telegraf, ELK, Filebeat, Go, Python ademais de realizar algunhas contribucións
        ao proxecto de Openshift xerando algúns operators en k8s para compoñentes de Openstack. </p>

        <p>Comecei a contribuír á comunidade Open source.</p>
        `,
        "resumeText": "CV / Resumen"
    }
}

// Put english language by default
document.getElementById("welcomeText").innerHTML = languages["en"]["welcomeText"];
document.getElementById("resumeText").innerHTML = languages["en"]["resumeText"];

// Change language based on the user choice and the text received by the attribute 'language'
function changeLanguage(element) {
    languageSelected = element.getAttribute("language")
    Object.keys(languages).forEach((languageKey) => {
        if (languageSelected === languageKey) {
            Object.keys(languages[languageKey]).forEach((key) => {
                document.getElementById(key).innerHTML = languages[languageKey][key];
            })
        }
    })
}