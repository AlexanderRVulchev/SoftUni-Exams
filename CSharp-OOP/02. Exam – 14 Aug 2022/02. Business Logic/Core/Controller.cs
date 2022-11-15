using PlanetWars.Core.Contracts;
using PlanetWars.Models.MilitaryUnits.Contracts;
using PlanetWars.Models.MilitaryUnits;
using PlanetWars.Models.Planets.Contracts;
using PlanetWars.Models.Planets;
using PlanetWars.Models.Weapons.Contracts;
using PlanetWars.Models.Weapons;
using PlanetWars.Repositories;
using PlanetWars.Utilities.Messages;
using System;
using System.Linq;
using System.Text;

namespace PlanetWars.Core
{
    public class Controller : IController
    {
        private PlanetRepository planets;

        public Controller()
        {
            planets = new PlanetRepository();
        }

        public string AddUnit(string unitTypeName, string planetName)
        {
            if (!planets.Models.Any(x => x.Name == planetName))
            {
                throw new InvalidOperationException(String.Format(ExceptionMessages.UnexistingPlanet, planetName));
            }
            if (!new string[] { "SpaceForces", "StormTroopers", "AnonymousImpactUnit" }.Contains(unitTypeName))
            {
                throw new InvalidOperationException(string.Format(ExceptionMessages.ItemNotAvailable, unitTypeName));
            }
            IPlanet targetPlanet = planets.FindByName(planetName);
            if (targetPlanet.Army.Any(x => x.GetType().Name == unitTypeName))
            {
                throw new InvalidOperationException(string.Format(ExceptionMessages.UnitAlreadyAdded, unitTypeName, planetName));
            }

            IMilitaryUnit unitToAdd = null;
            switch (unitTypeName)
            {
                case "SpaceForces": unitToAdd = new SpaceForces(); break;
                case "StormTroopers": unitToAdd = new StormTroopers(); break;
                case "AnonymousImpactUnit": unitToAdd = new AnonymousImpactUnit(); break;
            }
            targetPlanet.Spend(unitToAdd.Cost);
            targetPlanet.AddUnit(unitToAdd);
            return string.Format(OutputMessages.UnitAdded, unitTypeName, planetName);
        }

        public string AddWeapon(string planetName, string weaponTypeName, int destructionLevel)
        {
            if (!planets.Models.Any(x => x.Name == planetName))
            {
                throw new InvalidOperationException(String.Format(ExceptionMessages.UnexistingPlanet, planetName));
            }
            IPlanet targetPlanet = planets.FindByName(planetName);
            if (targetPlanet.Weapons.Any(x => x.GetType().Name == weaponTypeName))
            {
                throw new InvalidOperationException(string.Format(ExceptionMessages.WeaponAlreadyAdded, weaponTypeName, planetName));
            }
            if (!new string[] { "BioChemicalWeapon", "NuclearWeapon", "SpaceMissiles" }.Contains(weaponTypeName))
            {
                throw new InvalidOperationException(string.Format(ExceptionMessages.ItemNotAvailable, weaponTypeName));
            }

            IWeapon weaponToAdd = null;
            switch (weaponTypeName)
            {
                case "BioChemicalWeapon": weaponToAdd = new BioChemicalWeapon(destructionLevel); break;
                case "NuclearWeapon": weaponToAdd = new NuclearWeapon(destructionLevel); break;
                case "SpaceMissiles": weaponToAdd = new SpaceMissiles(destructionLevel); break;
            }
            targetPlanet.Spend(weaponToAdd.Price);
            targetPlanet.AddWeapon(weaponToAdd);
            return String.Format(OutputMessages.WeaponAdded, planetName, weaponTypeName);
        }

        public string CreatePlanet(string name, double budget)
        {
            if (planets.Models.Any(x => x.Name == name))
            {
                return String.Format(OutputMessages.ExistingPlanet, name);
            }
            IPlanet planet = new Planet(name, budget);
            planets.AddItem(planet);
            return String.Format(OutputMessages.NewPlanet, name);
        }

        public string ForcesReport()
        {
            StringBuilder sb = new StringBuilder();

            sb.AppendLine("***UNIVERSE PLANET MILITARY REPORT***");
            foreach (var planet in planets.Models
                .OrderByDescending(x => x.MilitaryPower)
                .ThenBy(x => x.Name))
            {
                sb.AppendLine(planet.PlanetInfo());
            }
            return sb.ToString().TrimEnd();
        }

        public string SpaceCombat(string planetOne, string planetTwo)
        {
            IPlanet firstPlanet = planets.FindByName(planetOne);
            IPlanet secondPlanet = planets.FindByName(planetTwo);
            string winner = "none";
            if (firstPlanet.MilitaryPower > secondPlanet.MilitaryPower)
                winner = "first";
            else if (firstPlanet.MilitaryPower < secondPlanet.MilitaryPower)
                winner = "second";

            if (winner == "none")
            {                
                bool firstHasNuclear = firstPlanet.Weapons.Any(x => x.GetType().Name == "NuclearWeapon");
                bool secondHasNuclear = secondPlanet.Weapons.Any(x => x.GetType().Name == "NuclearWeapon");

                if (firstHasNuclear && !secondHasNuclear)
                {
                    winner = "first";
                }
                else if (!firstHasNuclear && secondHasNuclear)
                {
                    winner = "second";
                }
            }
            string output = string.Empty;
            switch (winner)
            {
                case "first":
                    output = CombatAftermath(firstPlanet, secondPlanet); break;
                case "second":
                    output = CombatAftermath(secondPlanet, firstPlanet); break;
                case "none":
                    firstPlanet.Spend(firstPlanet.Budget / 2);
                    secondPlanet.Spend(secondPlanet.Budget / 2);
                    output = OutputMessages.NoWinner;
                    break;
            }
            return output;
        }

        private string CombatAftermath(IPlanet winner, IPlanet loser)
        {            
            double salvageProfit = loser.Army.Sum(x => x.Cost) +
                                   loser.Weapons.Sum(x => x.Price);

            winner.Spend(winner.Budget / 2);
            winner.Profit(loser.Budget / 2);
            winner.Profit(salvageProfit);
            planets.RemoveItem(loser.Name);
            return String.Format(OutputMessages.WinnigTheWar, winner.Name, loser.Name);
        }

        public string SpecializeForces(string planetName)
        {
            if (!planets.Models.Any(x => x.Name == planetName))
            {
                throw new InvalidOperationException(String.Format(ExceptionMessages.UnexistingPlanet, planetName));
            }
            IPlanet targetPlanet = planets.FindByName(planetName);
            if (!targetPlanet.Army.Any())
            {
                throw new InvalidOperationException(ExceptionMessages.NoUnitsFound);
            }
            targetPlanet.Spend(1.25);
            targetPlanet.TrainArmy();
            return String.Format(OutputMessages.ForcesUpgraded, planetName);
        }
    }
}
