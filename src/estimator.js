// Default Configuration given
const input = {
        region: {
        name: "Africa",
        avgAge: 19.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71
        },

        periodType: "days",
        timeToElapse: 58,
        reportedCases: 674,
        population: 66622705,
        totalHospitalBeds: 1380614
};
const covid19ImpactEstimator = (data=input) => ({

        data: input,
        estimate:{
            impact: {
            currentlyInfected: input.reportedCases * 10,
            infectionsByRequestedTime: currentlyInfected * (2 ** (Math.floor( input.timeToElapse/3))),
            severeCasesByRequestedTime: 0.15 * infectionsByRequestedTime,
            hospitalBedsByRequestedTime: input.totalHospitalBeds * 0.35,
            casesForICUByRequestedTime: infectionsByRequestedTime * 0.5,
            casesForVentilatorsByRequestedTime: infectionsByRequestedTime * 0.2,
            dollarsInFlight: (infectionsByRequestedTime * 0.65 * Math.floor(input.avgDailyIncomeInUSD)) / 30,
        },

        severeImpact: {
            currentlyInfected: input.reportedCases * 50,
            infectionsByRequestedTime: currentlyInfected * (2 ** (Math.floor(input.timeToElapse / 3))),
            severeCasesByRequestedTime: 0.15 * infectionsByRequestedTime,
            hospitalBedsByRequestedTime: totalHospitalBeds * 0.35,
            casesForICUByRequestedTime: infectionsByRequestedTime * 0.5,
            casesForVentilatorsByRequestedTime: infectionsByRequestedTime * 0.2,
            dollarsInFlight: (infectionsByRequestedTime * 0.65 * Math.floor(input.avgDailyIncomeInUSD)) / 30
        }, 
    }
});

export default covid19ImpactEstimator;