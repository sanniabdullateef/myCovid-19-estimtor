// Default Configuration given below for input 

// eslint-disable-next-line no-unused-vars
const data = {
        region: {
        name: "Africa",
        avgAge: 19.7,
        avgDailyIncomeInUSD: 4,
        avgDailyIncomePopulation: 0.73
        },

        periodType: "days",
        timeToElapse: 38,
        reportedCases: 2747,
        population: 92931687,
        totalHospitalBeds: 678874
};
// eslint-disable-next-line no-shadow
const covid19ImpactEstimator = (data) => {
const { reportedCases, periodType, totalHospitalBeds} = data;
let {timeToElapse} = data;
const {avgDailyIncomeInUSD, avgDailyIncomePopulation} = data.region;

const currentlyInfected = reportedCases * 10;
const severeCurrentlyInfected = reportedCases * 50;

if(periodType === "weeks"){
    timeToElapse *= 7;
} else if (periodType === "months"){
    timeToElapse *= 30;
};

// Cases for Impact of covid-19 Estimator Calculations

const infectionsByRequestedTime = currentlyInfected (2 * (Math.trunc(timeToElapse / 3)));
const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.15);
const hospitalBedsByRequestedTime = Math.trunc((totalHospitalBeds * 0.35) - severeCasesByRequestedTime);
const casesForICUByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.05);
const casesForVentilatorsByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.02);
const dollarsInFlight = Math.trunc((infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / timeToElapse);

// Cases for severeImpact of covid-19 Estimator Calculations

const severeInfectionsByRequestedTime = severeCurrentlyInfected (2 * (Math.trunc(timeToElapse / 3)));
const severeSevereCasesByRequestedTime = Math.trunc(severeInfectionsByRequestedTime * 0.15);
const severeHospitalBedsByRequestedTime = Math.trunc((totalHospitalBeds * 0.35) - severeCasesByRequestedTime);
const severeCasesForICUByRequestedTime = Math.trunc(severeInfectionsByRequestedTime * 0.05);
const severeCasesForVentilatorsByRequestedTime = Math.trunc(severeInfectionsByRequestedTime * 0.02);
const severeDollarsInFlight = Math.trunc((severeInfectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / timeToElapse);
           
           return {
            data,
            impact: {
            currentlyInfected,
            infectionsByRequestedTime,
            severeCasesByRequestedTime,
            hospitalBedsByRequestedTime,
            casesForICUByRequestedTime,
            casesForVentilatorsByRequestedTime,
            dollarsInFlight
        },

        severeImpact: {
            currentlyInfected: severeCurrentlyInfected,
            infectionsByRequestedTime: severeInfectionsByRequestedTime,
            casesByRequestedTime: severeSevereCasesByRequestedTime,
            hospitalBedsByRequestedTime: severeHospitalBedsByRequestedTime,
            casesForICUByRequestedTime: severeCasesForICUByRequestedTime,
            casesForVentilatorsByRequestedTime: severeCasesForVentilatorsByRequestedTime,
            dollarsInFlight: severeDollarsInFlight
        } 
  };
};

export default covid19ImpactEstimator;