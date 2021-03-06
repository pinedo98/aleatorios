
function getZ(alpha) {
  const zValues = {
    "0.995": -2.58,
    "0.99": -2.33,
    "0.975": -1.96,
    "0.95": -1.64,
    "0.9": -1.28,
    "0.75": -.674,
    "0.5": 0,
    "0.25": .674,
    "0.1": 1.282,
    "0.05": 1.645,
    "0.025": 1.96,
    "0.01": 2.33,
    "0.005": 2.58,
  }
  return zValues[alpha.toString()];
}

function getAverage(arr) {
  const average = arr.reduce((a, b) => a + b, 0) / arr.length;

  console.log(average)
  return average;
}

function sum(arr) {
  let sum = arr.reduce((a, b) => a + b, 0)
  return sum;
}

function normalcdf(X) {   //HASTINGS.  MAX ERROR = .000001
  var T = 1 / (1 + .2316419 * Math.abs(X));
  var D = .3989423 * Math.exp(-X * X / 2);
  var Prob = D * T * (.3193815 + T * (-.3565638 + T * (1.781478 + T * (-1.821256 + T * 1.330274))));
  if (X > 0) {
    Prob = 1 - Prob
  }
  return Prob
}

function compute(argument) {
  let Z = argument;
  let M = 0;
  let SD = 1;
  let Prob = 0;

  if (SD < 0) {
    alert("The standard deviation must be nonnegative.")
  } else if (SD == 0) {
    if (Z < M) {
      Prob = 0
    } else {
      Prob = 1
    }
  } else {
    Prob = normalcdf((Z - M) / SD);
    Prob = Math.round(100000 * Prob) / 100000;
  }

  return (1 - Prob).toFixed(4);
}


export function testing() {

  // console.log("Medias: " + validateMedias(.05, [.92, .012, 0.2352, 0.5319, 0.2917, 0.5088]))

  // console.log("Validate uniformidad" + validateUniformidad(0.5, [0.97, .11, .65, .26, .98, .03, .13, .89, .21, .69]))

  // console.log(validateVarianza(.05, [0.0449, 0.1733, 0.5746, 0.049, 0.8406, 0.8349, 0.92, 0.2564,
  //   0.6015, 0.6694, 0.3972, 0.7025, 0.1055, 0.1247, 0.1977, 0.0125,
  //   0.63, 0.2531, 0.8297, 0.6483, 0.6972, 0.9582, 0.9085, 0.8524,
  //   0.5514, 0.0316, 0.3587, 0.7041, 0.5915, 0.2523, 0.2545, 0.3044,
  //   0.0207, 0.1067, 0.3587, 0.1746, 0.3362, 0.1589, 0.3727, 0.4145]))

  console.log("Validate independecia" + validateIndependencia(0.5, [0.97, .11, .65, .26, .98, .03, .13, .89, .21, .69]))
}

export function validateMedias(alpha, numbers) {
  let avg = getAverage(numbers);
  let lowLimit = .5 - getZ(alpha / 2) * (1 / Math.sqrt(12 * numbers.length));
  let highLimit = .5 + getZ(alpha / 2) * (1 / Math.sqrt(12 * numbers.length));

  console.log(highLimit + " > " + avg + " > " + lowLimit)
  let conclussion = "Se rechaza que el conjunto tiene un valor esperado de 0.5."
  if (avg > lowLimit && avg < highLimit) {
    conclussion = "No se rechaza que el conjunto tiene un valor esperado de 0.5."
  }
  return {
    name: 'Prueba de medias',
    results: highLimit.toFixed(4) + " > " + avg.toFixed(4) + " > " + lowLimit.toFixed(4),
    conclussion,
    success: avg > lowLimit && avg < highLimit
  }
}

export function validateIndependencia(alpha, numbers) {
  //Creamos una lista para guardar los ceros y unos.
  let bits = [];
  let i, corridas, dato, media, varianza, z;
  //Revisa si cada dato actual es menor al dato anterior. 
  //Si es así, se guarda un 0, de lo contrario, se guarda un 1
  for (i = 1; i < numbers.length; i++) {
    if (numbers[i] <= numbers[i - 1]) {
      bits.push(0);
    }
    else {
      bits.push(1);
    }
  }

  //Imprimimos la cadena de ceros y unos
  // for (i = 0; i < bits.length; i++) {
  // console.log(bits[i]);
  // }

  //Contamos las corridas. 
  corridas = 1;
  //Comenzamos observando el primer dígito
  dato = bits[0];
  //Comparamos cada dígito con el observado, cuando cambia es 
  //una nueva corrida

  for (i = 1; i < bits.length; i++) {
    if (bits[i] != dato) {
      corridas++;
      dato = bits[i];
    }
  }
  // console.log("Corridas " + corridas);

  //Aplicamos las fórmulas para media, varianza y Z.
  media = (2 * numbers.length - 1) / 3;
  // console.log("Media: " + media);
  varianza = (16 * numbers.length - 29) / 90;
  // console.log("Varianza: " + varianza);
  z = Math.abs((corridas - media) / varianza);
  // console.log("Z=" + z);

  //Obtenemos el valor Z de la tabla de distribución normal
  let zn = getZ(1 - alpha / 2);


  let conclussion = "No se rechaza que el conjunto es independiente."
  if (z < zn) {
    conclussion = "Se rechaza que el conjunto es independiente."
  }

  return {
    name: 'Prueba de independencia (corridas arriba y abajo)',
    results: z.toFixed(4) + " > " + zn.toFixed(4),
    conclussion,
    success: z >= zn
  }
}


export function validateVarianza(alpha, numbers) {
  let avg = getAverage(numbers);
  let sum = 0;
  numbers.forEach(number => sum += Math.pow(number - avg, 2));
  let variance = sum / (numbers.length - 1);
  // console.log(variance)

  try {

    let highLimit = getX(alpha / 2, numbers.length - 1) / (12 * numbers.length - 1);
    let lowLimit = getX(1 - (alpha / 2), numbers.length - 1) / (12 * numbers.length - 1);

    // console.log("X^2: ")
    // console.log(getX(alpha / 2, numbers.length - 1));
    // console.log("X^2: ")
    // console.log(getX(1 - (alpha / 2), numbers.length - 1));

    console.log(highLimit + " > " + variance + " > " + lowLimit)

    let conclussion = "Se rechaza que el conjunto tiene una varianza de 1/12."
    if (variance > lowLimit && variance < highLimit) {
      conclussion = "No se rechaza que el conjunto tiene una varianza de 1/12."
    }

    return {
      name: 'Prueba de varianza',
      results: highLimit.toFixed(4) + " > " + variance.toFixed(4) + " > " + lowLimit.toFixed(4),
      conclussion,
      success: variance > lowLimit && variance < highLimit
    }

  } catch (e) {
    return {
      name: 'Prueba de varianza',
      results: "N/A",
      conclussion: "Pi es demasiado grande, no se pudo encontrar chi cuadrado.",
      success: false
    }
  }
}

export function validateUniformidad(alpha, numbers) {
  return validateWithChiSquare(alpha, numbers);
}

function validateWithChiSquare(alpha, numbers) {
  let m = Math.sqrt(numbers.length);
  let a = 1 / m;
  let categories = [];
  console.log("m: " + m)
  console.log("a: " + a)

  for (let i = 0; i < m; i++) {
    categories[i] = 0;
  }

  numbers.forEach(number => {
    for (let i = 0; i < m; i++) {
      let min = i * a;
      let max = min + a;
      if (number > min && number <= max) {
        categories[i]++;
        break;
      }
    }
  })

  let expectedFrequency = numbers.length / m;
  let x = 0;
  categories.forEach(category => {
    x += Math.pow((expectedFrequency - category), 2) / expectedFrequency;
  })

  console.log("categories: " + categories);
  console.log("x obtained: " + x);

  console.log("x from table: " + getX(alpha, (m - 1).toFixed(0)));

  let conclussion = "Se rechaza que el conjunto sigue una distribución uniforme."
  if (getX(alpha, (m - 1).toFixed(0)) > x.toFixed(4)) {
    conclussion = "No se rechaza que el conjunto sigue una distribución uniforme."
  }

  return {
    name: 'Prueba de uniformidad (Chi-cuadrada)',
    results: getX(alpha, (m - 1).toFixed(0)) + " > " + x.toFixed(4),
    conclussion,
    success: getX(alpha, (m - 1).toFixed(0)) > x.toFixed(4)
  }


}

// Kolmogorov-Smirnov Test
function validateWithKolmogorov(alpha, numbers) {
  let numbersToSort = [...numbers]
  numbersToSort = numbersToSort.sort((a, b) => a - b);
  let numbers2 = numbersToSort;

  let dPlusValues = [];
  let dLessValues = [];

  console.log('PRUEBA DE UNIFORMIDAD');

  numbers2.forEach(number => {
    let d = ((numbers2.indexOf(number) + 1) / numbers2.length) - number;
    dPlusValues.push(d);
    let dLess = number - (numbers2.indexOf(number) / numbers2.length);
    console.log('Index: ' + number + ' ' + numbers2.indexOf(number));
    dLessValues.push(dLess);
  });

  let dPlusMax = Math.max(...dPlusValues);
  let dLessMax = Math.max(...dLessValues);
  let dMax = Math.max(dLessMax, dPlusMax);

  console.log("dPlusMax")
  console.log(dPlusMax)
  console.log("dLessMax")
  console.log(dLessMax)
  console.log("dMax")
  console.log(dMax)

  let kolmogorov = getKolmogorovValue(alpha, numbers2.length)

  console.log(dMax + " > " + kolmogorov)


  let conclussion = "Se rechaza que el conjunto sigue una distribución uniforme."
  if (dMax > kolmogorov) {
    conclussion = "No se rechaza que el conjunto sigue una distribución uniforme."
  }

  return {
    name: 'Prueba de uniformidad (Kolmogorov-Smirnov)',
    results: dMax.toFixed(4) + " > " + kolmogorov.toFixed(4),
    conclussion,
    success: dMax > kolmogorov
  }
}


function getX(pi, theta) {
  let index = chiPi.indexOf(pi);

  console.log("Theta: " + theta)
  console.log("pi: " + pi)
  if (theta > 30) {
    theta = parseInt((theta / 10).toFixed(0)) * 10
    console.log(theta);
  }

  return chiSquareDistribution[theta + ""][Number(index)];
}


function getKolmogorovValue(d, degrees) {
  let index = dAlphas.indexOf(d);

  console.log("D: " + d)
  console.log("Degrees: " + degrees)

  if (degrees > 50) {
    console.log("IS MORE THAN 50")
    return divders[index] / Math.sqrt(degrees)
  }

  return freeDegrees[degrees + ""][Number(index)];
}

const dAlphas = [0.20, 0.10, 0.05, 0.02, 0.01, 0.005, 0.002, 0.001]
const divders = [1.07, 1.22, 1.36, 1.52, 1.63, 1.73, 1.85, 1.95]
const freeDegrees = {
  "1": [0.90000, 0.95000, 0.97500, 0.99000, 0.99500, 0.99750, 0.99900, 0.99950],
  "2": [0.68337, 0.77639, 0.84189, 0.90000, 0.92929, 0.95000, 0.96838, 0.97764],
  "3": [0.56481, 0.63604, 0.70760, 0.78456, 0.82900, 0.86428, 0.90000, 0.92065],
  "4": [0.49265, 0.56522, 0.62394, 0.68887, 0.73424, 0.77639, 0.82217, 0.85047],
  "5": [0.44698, 0.50945, 0.56328, 0.62718, 0.66853, 0.70543, 0.75000, 0.78137],
  "6": [0.41037, 0.46799, 0.51926, 0.57741, 0.61661, 0.65287, 0.69571, 0.72479],
  "7": [0.38148, 0.43607, 0.48342, 0.53844, 0.57581, 0.60975, 0.65071, 0.67930],
  "8": [0.35831, 0.40962, 0.45427, 0.50654, 0.54179, 0.57429, 0.61368, 0.64098],
  "9": [0.33910, 0.38746, 0.43001, 0.47960, 0.51332, 0.54443, 0.58210, 0.60846],
  "10": [0.32260, 0.36866, 0.40925, 0.45562, 0.48893, 0.51872, 0.55500, 0.58042],
  "11": [0.30829, 0.35242, 0.39122, 0.43670, 0.46770, 0.49539, 0.53135, 0 - 55588],
  "12": [0.29577, 0.33815, 0.37543, 0.41918, 0.44905, 0.47672, 0.51047, 0.53422],
  "13": [0.28470, 0.32549, 0.36143, 0.40362, 0.43247, 0.45921, 0.49189, 0.51490],
  "14": [0.27481, 0.31417, 0.34890, 0.38970, 0.41762, 0.44352, 0.47520, 0.49753],
  "15": [0.26589, 0.30397, 0.33750, 0.37713, 0.40420, 0.42934, 0.45611, 0.48182],
  "16": [0.25778, 0.29472, 0.32733, 0.36571, 0.39201, 0.41644, 0.44637, 0.46750],
  "17": [0.25039, 0.28627, 0.31796, 0.35528, 0.38086, 0.40464, 0.43380, 0.45540],
  "18": [0.24360, 0.27851, 0.30936, 0.34569, 0.37062, 0.39380, 0.42224, 0.44234],
  "19": [0.23735, 0.27136, 0.30143, 0.33685, 0.36117, 0.38379, 0.41156, 0.43119],
  "20": [0.23156, 0.26473, 0.29408, 0.32866, 0.35241, 0.37451, 0.40165, 0.42085],
  "21": [0.22517, 0.25858, 0.28724, 0.32104, 0.34426, 0.36588, 0.39243, 0.41122],
  "22": [0.22115, 0.25283, 0.28087, 0.31394, 0.33666, 0.35782, 0.38382, 0.40223],
  "23": [0.21646, 0.24746, 0.27490, 0.30728, 0.32954, 0.35027, 0.37575, 0.39380],
  "24": [0.21205, 0.24242, 0.26931, 0.30104, 0.32286, 0.34318, 0.36787, 0.38588],
  "25": [0.20790, 0.23768, 0.26404, 0.29518, 0.31657, 0.33651, 0.36104, 0.37743],
  "26": [0.20399, 0.23320, 0.25908, 0.28962, 0.30963, 0.33022, 0.35431, 0.37139],
  "27": [0.20030, 0.22898, 0.25438, 0.28438, 0.30502, 0.32425, 0.34794, 0.36473],
  "28": [0.19680, 0.22497, 0.24993, 0.27942, 0.29971, 0.31862, 0.34190, 0.35842],
  "29": [0.19348, 0.22117, 0.24571, 0.27471, 0.29466, 0.31327, 0.33617, 0.35242],
  "30": [0.19032, 0.21756, 0.24170, 0.27023, 0.28986, 0.30818, 0.33072, 0.34672],
  "31": [0.18732, 0.21412, 0.23788, 0.26596, 0.28529, 0.30333, 0.32553, 0.34129],
  "32": [0.18445, 0.21085, 0.23424, 0.26189, 0.28094, 0.29870, 0.32058, 0.33611],
  "33": [0.18171, 0.20771, 0.23076, 0.25801, 0.27577, 0.29428, 0.31584, 0.33115],
  "34": [0.17909, 0.21472, 0.22743, 0.25429, 0.27271, 0.29005, 0.31131, 0.32641],
  "35": [0.17659, 0.20185, 0.22425, 0.25073, 0.26897, 0.28600, 0.30597, 0.32187],
  "36": [0.17418, 0.19910, 0.22119, 0.24732, 0.26532, 0.28211, 0.30281, 0.31751],
  "37": [0.17188, 0.19646, 0.21826, 0.24404, 0.26180, 0.27838, 0.29882, 0.31333],
  "38": [0.16966, 0.19392, 0.21544, 0.24089, 0.25843, 0.27483, 0.29498, 0.30931],
  "39": [0.16753, 0.19148, 0.21273, 0.23785, 0.25518, 0.27135, 0.29125, 0.30544],
  "40": [0.16547, 0.18913, 0.21012, 0.23494, 0.25205, 0.26803, 0.28772, 0.30171],
  "41": [0.16349, 0.18687, 0.20760, 0.23213, 0.24904, 0.26482, 0.28429, 0.29811],
  "42": [0.16158, 0.18468, 0.20517, 0.22941, 0.24613, 0.26173, 0.28097, 0.29465],
  "43": [0.15974, 0.18257, 0.20283, 0.22679, 0.24332, 0.25875, 0.27778, 0.29130],
  "44": [0.15795, 0.18051, 0.20056, 0.22426, 0.24060, 0.25587, 0.27468, 0.28806],
  "45": [0.15623, 0.17856, 0.19837, 0.22181, 0.23798, 0.25308, 0.27169, 0.28493],
  "46": [0.15457, 0.17665, 0.19625, 0.21944, 0.23544, 0.25038, 0.26880, 0.28190],
  "47": [0.15295, 0.17481, 0.19420, 0.21715, 0.23298, 0.24776, 0.26600, 0.27896],
  "48": [0.15139, 0.17301, 0.19221, 0.21493, 0.23059, 0.24523, 0.26328, 0.27611],
  "49": [0.14987, 0.17128, 0.19028, 0.21281, 0.22832, 0.24281, 0.26069, 0.27339],
  "50": [0.14840, 0.16959, 0.18841, 0.21068, 0.22604, 0.24039, 0.25809, 0.27067],
}

const chiPi = [0.995, 0.990, 0.975, 0.95, 0.9, 0.1, 0.05, 0.025, 0.01, 0.005];
const chiSquareDistribution = {
  "1": [3.9E-05, 0.0002, 0.0010, 0.0039, 0.0158, 2.7055, 3.8415, 5.0239, 6.6349, 7.8794],
  "2": [0.0100, 0.0201, 0.0506, 0.1026, 0.2107, 4.6052, 5.9915, 7.3778, 9.2103, 10.5966],
  "3": [0.0717, 0.1148, 0.2158, 0.3518, 0.5844, 6.2514, 7.8147, 9.3484, 11.3449, 12.8382],
  "4": [0.2070, 0.2971, 0.4844, 0.7107, 1.0636, 7.7794, 9.4877, 11.1433, 13.2767, 14.8603],
  "5": [0.4117, 0.5543, 0.8312, 1.1455, 1.6103, 9.2364, 11.0705, 12.8325, 15.0863, 16.7496],
  "6": [0.6757, 0.8721, 1.2373, 1.6354, 2.2041, 10.6446, 12.5916, 14.4494, 16.8119, 18.5476],
  "7": [0.9893, 1.2390, 1.6899, 2.1673, 2.8331, 12.0170, 14.0671, 16.0128, 18.4753, 20.2777],
  "8": [1.3444, 1.6465, 2.1797, 2.7326, 3.4895, 13.3616, 15.5073, 17.5345, 20.0902, 21.9550],
  "9": [1.7349, 2.0879, 2.7004, 3.3251, 4.1682, 14.6837, 16.9190, 19.0228, 21.6660, 23.5894],
  "10": [2.1559, 2.5582, 3.2470, 3.9403, 4.8652, 15.9872, 18.3070, 20.4832, 23.2093, 25.1882],
  "11": [2.6032, 3.0535, 3.8157, 4.5748, 5.5778, 17.2750, 19.6751, 21.9200, 24.7250, 26.7568],
  "12": [3.0738, 3.5706, 4.4038, 5.2260, 6.3038, 18.5493, 21.0261, 23.3367, 26.2170, 28.2995],
  "13": [3.5650, 4.1069, 5.0088, 5.8919, 7.0415, 19.8119, 22.3620, 24.7356, 27.6882, 29.8195],
  "14": [4.0747, 4.6604, 5.6287, 6.5706, 7.7895, 21.0641, 23.6848, 26.1189, 29.1412, 31.3193],
  "15": [4.6009, 5.2293, 6.2621, 7.2609, 8.5468, 22.3071, 24.9958, 27.4884, 30.5779, 32.8013],
  "16": [5.1422, 5.8122, 6.9077, 7.9616, 9.3122, 23.5418, 26.2962, 28.8454, 31.9999, 34.2672],
  "17": [5.6972, 6.4078, 7.5642, 8.6718, 10.0852, 24.7690, 27.5871, 30.1910, 33.4087, 35.7185],
  "18": [6.2648, 7.0149, 8.2307, 9.3905, 10.8649, 25.9894, 28.8693, 31.5264, 34.8053, 37.1565],
  "19": [6.8440, 7.6327, 8.9065, 10.1170, 11.6509, 27.2036, 30.1435, 32.8523, 36.1909, 38.5823],
  "20": [7.4338, 8.2604, 9.5908, 10.8508, 12.4426, 28.4120, 31.4104, 34.1696, 37.5662, 39.9968],
  "21": [8.0337, 8.8972, 10.2829, 11.5913, 13.2396, 29.6151, 32.6706, 35.4789, 38.9322, 41.4011],
  "22": [8.6427, 9.5425, 10.9823, 12.3380, 14.0415, 30.8133, 33.9244, 36.7807, 40.2894, 42.7957],
  "23": [9.2604, 10.1957, 11.6886, 13.0905, 14.8480, 32.0069, 35.1725, 38.0756, 41.6384, 44.1813],
  "24": [9.8862, 10.8564, 12.4012, 13.8484, 15.6587, 33.1962, 36.4150, 39.3641, 42.9798, 45.5585],
  "25": [10.5197, 11.5240, 13.1197, 14.6114, 16.4734, 34.3816, 37.6525, 40.6465, 44.3141, 46.9279],
  "26": [11.1602, 12.1981, 13.8439, 15.3792, 17.2919, 35.5632, 38.8851, 41.9232, 45.6417, 48.2899],
  "27": [11.8076, 12.8785, 14.5734, 16.1514, 18.1139, 36.7412, 40.1133, 43.1945, 46.9629, 49.6449],
  "28": [12.4613, 13.5647, 15.3079, 16.9279, 18.9392, 37.9159, 41.3371, 44.4608, 48.2782, 50.9934],
  "29": [13.1211, 14.2565, 16.0471, 17.7084, 19.7677, 39.0875, 42.5570, 45.7223, 49.5879, 52.3356],
  "30": [13.7867, 14.9535, 16.7908, 18.4927, 20.5992, 40.2560, 43.7730, 46.9792, 50.8922, 53.6720],
  "40": [20.7065, 22.1643, 24.433, 26.5093, 29.0505, 51.8051, 55.7585, 59.3417, 63.6907, 66.7660],
  "50": [27.9907, 29.7067, 32.3574, 34.7643, 37.6886, 63.1671, 67.5048, 71.4202, 76.1539, 79.4900],
  "60": [35.5345, 37.4849, 40.4817, 43.188, 46.4589, 74.3970, 79.0819, 83.2977, 88.3794, 91.9517],
  "70": [43.2752, 45.4417, 48.7576, 51.7393, 55.3289, 85.5270, 90.5312, 95.0232, 100.425, 104.215],
  "80": [51.1719, 53.5401, 57.1532, 60.3915, 64.2778, 96.5782, 101.879, 106.629, 112.329, 116.321],
  "90": [59.1963, 61.7541, 65.6466, 69.1260, 73.2911, 107.565, 113.145, 118.136, 124.116, 128.299],
  "100": [67.3276, 70.0649, 74.2219, 77.9295, 82.3581, 118.498, 124.342, 129.561, 135.807, 140.169],
}