export type Winner = {
  division: string;
  team: string;
  runnerUp?: string;
};

export type YearWinners = {
  year: string;
  winners: Winner[];
};

export const previousWinners: YearWinners[] = [
  {
    year: "2025",
    winners: [
      { division: "17/18 Open", team: "Impact 18U Carrie" },
      { division: "15/16 Open", team: "FaR Out 15 Gold" },
      { division: "13/14 Open", team: "Krush VBC 14 National"},
    ],
  },
  {
    year: "2024",
    winners: [
      { division: "17/18 Open", team: "FaR Out 17 Gold" },
      { division: "15/16 Open", team: "NorthShore 16 Betas" },
      { division: "13/14 Open", team: "IDV 14U Lita" },
    ],
  },
  {
    year: "2023",
    winners: [
      { division: "17/18 Open", team: "Inside Out 18Mizuno Black" },
      { division: "15/16 Open", team: "NorthShore 15 Lionfish" },
      { division: "13/14 Open", team: "NorthShore 14 SeaSerpents" },
    ],
  },
  {
    year: "2022",
    winners: [
      { division: "17/18 Open", team: "Inside Out 18Mizuno Black" },
      { division: "15/16 Open", team: "Dunes 16 Black" },
      { division: "13/14 Open", team: "FaR Out 13 Black" },
    ],
  },
  {
    year: "2021",
    winners: [
      { division: "17/18 Open", team: "Dunes 18 Black" },
      { division: "15/16 Open", team: "FaR Out 14 Black" },
      { division: "15/16 Premier", team: "FaR Out 14 Red" },
      { division: "13/14 Open", team: "FaR Out 14 Silver" },
    ],
  },
  {
    year: "2020",
    winners: [
      { division: "17/18 Open", team: "Dunes 17 Black" },
      { division: "15/16 Open", team: "FaR Out 14 Black" },
      { division: "13/14 Open", team: "FaR Out 13 Black" },
    ],
  },
  {
    year: "2019",
    winners: [
      { division: "18 Open", team: "Summit 18 Blue Elite" },
      { division: "17 Open", team: "Dunes 17 Black" },
      { division: "16 Open", team: "Far Out 16 Red" },
      { division: "15 Open", team: "Dunes 15 Black" },
      { division: "14 Open", team: "FaR Out 14 Red" },
      { division: "13 Open", team: "FaR Out 13 Black" },
    ],
  },
  {
    year: "2018",
    winners: [
      { division: "18 Open", team: "Summit 18 Blue Elite" },
      { division: "17 Open", team: "Dunes 17 Black" },
      { division: "16 Open", team: "Dunes 16 Black" },
      { division: "15 Open", team: "Dunes 15 Black" },
      { division: "14 Open", team: "TeamD 14-Red" },
      { division: "13 Open", team: "Dunes 13 Black" },
    ],
  },
  {
    year: "2017",
    winners: [
      { division: "18 Open", team: "Dunes 16 Black" },
      { division: "17 Open", team: "Dunes 17 Black" },
      { division: "16 Open", team: "Inside Out 16 Black" },
      { division: "15 Open", team: "Dunes 14 Black" },
      { division: "14 Open", team: "Dunes 14 Teal" },
      { division: "13 Open", team: "Dunes 13 Black" },
    ],
  },
  {
    year: "2016",
    winners: [
      {
        division: "18 Open",
        team: "Impact Dynamic 18 Rey",
        runnerUp: "Far Out 18 Purple",
      },
      {
        division: "16 Open",
        team: "Dunes 16 Black",
        runnerUp: "Impact Dynamic 16u Rachel",
      },
      { division: "14 Open", team: "Dunes 13 Black", runnerUp: "Team D 13-1" },
    ],
  },
];
