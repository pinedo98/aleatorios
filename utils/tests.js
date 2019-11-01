
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
  const average = arr.reduce((a,b) => a + b, 0) / arr.length;
  
  console.log(average)
  return average;
}

function sum(arr) {
  let sum = arr.reduce((a,b) => a + b, 0)
  return sum;
}

function normalcdf(X){   //HASTINGS.  MAX ERROR = .000001
	var T=1/(1+.2316419*Math.abs(X));
	var D=.3989423*Math.exp(-X*X/2);
	var Prob=D*T*(.3193815+T*(-.3565638+T*(1.781478+T*(-1.821256+T*1.330274))));
	if (X>0) {
		Prob=1-Prob
	}
	return Prob
}   

function compute(argument) {
    let Z=argument;
    let M=0;
    let SD=1;
    let Prob = 0;
    
		if (SD<0) {
			alert("The standard deviation must be nonnegative.")
		} else if (SD==0) {
		    if (Z<M){
		        Prob=0
		    } else {
			    Prob=1
			}
		} else {
			Prob=normalcdf((Z-M)/SD);
			Prob=Math.round(100000*Prob)/100000;
		}
	
    return (1 - Prob).toFixed(4);
}


export function getProbability(val) {
  // const normDist = new NormalDistribution(0, 1);
  // console.log(normDist.pdf(5.995))
  // console.log(normDist.cdf(5.995))
  // console.log(normDist.zScore(.5))
  // console.log(compute(.1))
  console.log("Medias: " + validateMedias(.05, [.92, .012, 0.2352, 0.5319, 0.2917, 0.5088]))
}

function validateMedias(alpha, numbers) {
  let avg = getAverage(numbers);
  let lowLimit = .5 - getZ(alpha/2) * (1 / Math.sqrt(12 * numbers.length));
  let highLimit = .5 + getZ(alpha/2) * (1 / Math.sqrt(12 * numbers.length));

  return (avg> lowLimit && avg < highLimit)
}


function validateVarianza(alpha, numbers) {
  let variance = Math.std(numbers);
  let highLimit = getX(alpha/2, numbers.length - 1) / (12 * numbers.length - 1);
  let lowLimit = getX(-alpha/2, numbers.length - 1) / (12 * numbers.length - 1);


  return (variance> lowLimit && variance < highLimit)
}


function validateUniformidad(alpha, numbers) {
  let variance = Math.std(numbers);
  let highLimit = getX(alpha/2, numbers.length - 1) / (12 * numbers.length - 1);
  let lowLimit = getX(-alpha/2, numbers.length - 1) / (12 * numbers.length - 1);


  return (variance> lowLimit && variance < highLimit)
}