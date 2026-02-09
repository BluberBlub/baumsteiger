import type { Service } from "../types";

export const services: Service[] = [
    {
        id: "baumpflege",
        title: "Baumpflege",
        description: "Maßnahmen für langfristig sichere und vitale Bäume. Durch artgerechte Schnitt- und Pflegemaßnahmen erhalten Sie nachhaltig vitale und sichere Bäume.",
        icon: "TreeDeciduous",
        image: "/images/services/baumpflege.jpg",
        details: [
            "Kronenschnitt",
            "Totholzentfernung",
            "Fassadenfreischnitt",
            "Jungbaumschnitt",
            "Obstbaumschnitt",
            "Habitatbaumgestaltung"
        ]
    },
    {
        id: "baumfaellung",
        title: "Baumfällung",
        description: "Ist der Erhalt eines Baumes nicht mehr möglich oder sinnvoll, bleibt am Ende nur die Fällung. Wir fällen Bäume in jedem Umfeld - sicher und effektiv.",
        icon: "Axe",
        image: "/images/services/baumfaellung.jpg",
        details: [
            "Fällung am Stück",
            "Seilklettertechnik",
            "Einsatz von Forstmaschinen",
            "Spezialfällungen"
        ]
    },
    {
        id: "baummanagement",
        title: "Baummanagement",
        description: "Bäume bringen auch Verantwortung mit sich. Wir verfassen Gutachten, Kataster und Sanierungskonzepte für Ihre Bäume und Baumbestände.",
        icon: "ClipboardList",
        image: "/images/services/baummanagement.jpg",
        details: [
            "Gutachten",
            "Baumkataster",
            "Sanierungskonzepte",
            "Gefährdungsanalysen",
            "Bekämpfung von Schadinsekten"
        ]
    },
    {
        id: "kronensicherung",
        title: "Kronensicherung",
        description: "Moderne Seilsicherungssysteme minimieren die Bruchgefahr bei alten und ausladenden Bäumen und erhalten dabei die individuelle Dynamik der Baumkrone.",
        icon: "Link",
        image: "/images/services/kronensicherung.jpg",
        details: [
            "Seilsicherungssysteme",
            "Stahlsicherungen",
            "Verbolzungen",
            "Individuelle Konzepte"
        ]
    },
    {
        id: "obstbaumschnitt",
        title: "Obstbaumschnitt",
        description: "Fachgerechte Sanierung und Erhalt von Hochstämmen und Streuobstwiesen. Wir sichern ein nachhaltiges Gleichgewicht von Fruchtertrag und Baumgesundheit.",
        icon: "Apple",
        image: "/images/services/obstbaumschnitt.jpg",
        details: [
            "Pflanzung und Pflege von Obstgehölzen",
            "Planung von Streuobstwiesen",
            "Erziehungs- und Erhaltungsschnitt",
            "Pflegepläne für Streuobstanlagen"
        ]
    },
    {
        id: "forstliche-dienstleistungen",
        title: "Forstliche Dienstleistungen",
        description: "Unsere Arbeit erstreckt sich auch in forstliche Bereiche. Wir arbeiten Hand in Hand mit Förstern, Forstwirten und Holzrückern.",
        icon: "Trees",
        image: "/images/services/forstdienst.jpg",
        details: [
            "Forstarbeiten",
            "Verkehrssicherung im Wald",
            "Zusammenarbeit mit Forstbetrieben"
        ]
    },
    {
        id: "naturschutz",
        title: "Naturschutz",
        description: "Wir setzen uns für die Schaffung und den Erhalt von Habitaten wie Streuobstanlagen oder Kopfbaumreihen sowie die Betreuung von ökologisch wertvollen alten Bäumen ein.",
        icon: "Leaf",
        image: "/images/services/naturschutz.jpg",
        details: [
            "Gestaltung von Habitatbäumen",
            "Anlage von Streuobstanlagen",
            "Erhalt von Hecken und Gehölzstreifen",
            "Waldrandgestaltung"
        ]
    }
];

export const companyInfo = {
    name: "Baumsteiger Allgäu",
    owner: "Raphael Bernhardt",
    street: "Oflingser Weg 17",
    zip: "88239",
    city: "Wangen im Allgäu",
    district: "Deuchelried",
    phone: "0151 28885660",
    email: "buero@baumsteiger-allgaeu.de",
    coordinates: {
        lat: 47.6952,
        lng: 9.8503
    }
};

export const navigation = [
    { label: "Der Baumsteiger", href: "#intro" },
    { label: "Leistungen", href: "#leistungen" },
    { label: "Galerie", href: "#galerie" },
    { label: "Kontakt", href: "#kontakt" }
];
