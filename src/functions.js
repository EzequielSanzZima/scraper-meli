import crypto from 'crypto';
import session from 'express-session';

const frases = [
    "sol", "mar", "luz", "café", "libro", "flor", "nieve", "cielo", "fuego", "lluvia",
    "roca", "viento", "bosque", "río", "lago", "arena", "planta", "pez", "fruta", "vino",
    "oro", "plata", "hierro", "cobre", "vidrio", "papel", "tinta", "rueda", "tren", "auto",
    "barco", "avión", "camino", "puente", "ciudad", "pueblo", "casa", "parque", "jardín", "muro",
    "pared", "techo", "puerta", "ventana", "espejo", "mesa", "silla", "sofá", "cama", "almohada",
    "sábana", "toalla", "jabón", "cepillo", "peine", "cuchara", "tenedor", "cuchillo", "vaso", "taza",
    "plato", "olla", "sartén", "fuego", "agua", "hielo", "vapor", "gas", "luz", "sombra",
    "fuego", "chispa", "humo", "brasa", "flama", "brillo", "rayo", "trueno", "relámpago", "tormenta",
    "nube", "arco", "iris", "estrella", "galaxia", "planeta", "luna", "cometa", "asteroide", "cráter",
    "montaña", "valle", "colina", "llanura", "desierto", "selva", "jungla", "isla", "península", "volcán",
    "acantilado", "caverna", "cueva", "cañón", "barranco", "río", "cascada", "lago", "laguna", "pantano",
    "charco", "arroyo", "fuente", "manantial", "mar", "océano", "golfo", "bahía", "estrecho", "canal",
    "costa", "playa", "orilla", "duna", "bahía", "tierra", "suelo", "barro", "lodo", "arena",
    "roca", "piedra", "gravilla", "mineral", "gema", "cristal", "diamante", "rubí", "esmeralda", "zafiro",
    "topacio", "cuarzo", "mica", "granito", "mármol", "pizarra", "carbón", "petróleo", "gas", "metal",
    "hierro", "acero", "cobre", "plomo", "estaño", "aluminio", "níquel", "oro", "plata", "platino",
    "zinc", "mercurio", "uranio", "plomo", "bismuto", "radio", "iridio", "cromo", "manganeso", "molibdeno",
    "wolframio", "litio", "sodio", "potasio", "calcio", "magnesio", "estroncio", "bario", "radio", "hidrógeno",
    "helio", "neón", "argón", "criptón", "xenón", "radón", "carbono", "nitrógeno", "oxígeno", "flúor",
    "cloro", "bromo", "yodo", "astato", "azufre", "selenio", "telurio", "polonio", "fósforo", "arsénico",
    "antimonio", "bismuto", "oxígeno", "nitrógeno", "flúor", "cloro", "bromo", "yodo", "hidrógeno", "litio",
    "sodio", "potasio", "rubidio", "cesio", "francio", "berilio", "magnesio", "calcio", "estroncio", "bario",
    "radio", "aluminio", "galio", "indio", "talio", "bismuto", "polonio", "nihonio", "flerovio", "moscovio",
    "livermorio", "tenesino", "oganesón", "hidrógeno", "helio", "litio", "berilio", "boro", "carbono",
    "nitrógeno", "oxígeno", "flúor", "neón", "sodio", "magnesio", "aluminio", "silicio", "fósforo", "azufre",
    "cloro", "argón", "potasio", "calcio", "escandio", "titanio", "vanadio", "cromo", "manganeso", "hierro",
    "cobalto", "níquel", "cobre", "zinc", "galio", "germanio", "arsénico", "selenio", "bromo", "cripton",
    "rubidio", "estroncio", "ytrio", "zirconio", "niobio", "molibdeno", "tecnecio", "rutenio", "rodio", "paladio",
    "plata", "cadmio", "indio", "estaño", "antimonio", "telurio", "yodo", "xenón", "cesio", "bario",
    "lantano", "cerio", "praseodimio", "neodimio", "prometio", "samario", "europio", "gadolinio", "terbio", "disprosio"
]

export function buscadorAleatorioPalabra(){
    const fraseIndex = Math.round(Math.random() * frases.length);
    return frases[fraseIndex];
}

export function getDate (mode, userdate) {
    const dte = userdate || new Date(),
        d = dte.getDate().toString(),
        m = (dte.getMonth() + 1).toString(),
        yyyy = dte.getFullYear().toString(),
        dd = (d.length < 2) ? '0' + d : d,
        mm = (m.length < 2) ? '0' + m : m,
        yy = yyyy.substring(2, 4);
    switch (mode) {
        case 'dd-mm-yyyy': return dd + '-' + mm + '-' + yyyy;
        case 'yyyymmdd': return yyyy + mm + dd;
        case 'dd-mm-yy': return dd + '-' + mm + '-' + yy;
        default: return dte;
    }
}

//cookie

const secret = crypto.randomBytes(64).toString('hex');
export function cookieForProducts(app){
    app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))};