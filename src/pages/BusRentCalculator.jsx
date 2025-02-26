import React, { useState } from "react";
import BusForm from "../components/organisms/BusForm";
import CalculationResults from "../components/organisms/CalculationResults";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const BusRentCalculator = () => {
  const [busType, setBusType] = useState("Shuttle");
  const [busCount, setBusCount] = useState(1);
  const [dayCount, setDayCount] = useState(1);
  const [shifCount, setShifCount] = useState(1);
  const [driverCount, setDriverCount] = useState(1);
  const [distance, setDistance] = useState({ pool_A: 0, a_B: 0, b_A: 0, b_Pool: 0 });
  const [fuelPrice, setFuelPrice] = useState(6800);
  const [driverFee, setDriverFee] = useState(539679);
  const [maintenancePrice, setMaintenancePrice] = useState(2086);
  const [depreciationCost, setDepreciationCost] = useState(8427234);
  const [margin, setMargin] = useState(10);
  const [tripCount, setTripCount] = useState(1);
  const [calculated, setCalculated] = useState(false);

  const totalKm = ((distance["a_B"] + distance["b_A"]) * tripCount * shifCount) + 
                      ((distance["pool_A"] + distance["b_Pool"]) * shifCount);
  const fuelCost = ((totalKm / 3) * fuelPrice) * busCount;
  const driverCost = (driverFee * driverCount) * shifCount;
  const maintenanceCost = totalKm * maintenancePrice * busCount;
  const totalDepreciationCost = depreciationCost * busCount;
  const totalDepreciationDailyCost = depreciationCost / 25;
  const totaloperational = fuelCost + maintenanceCost + totalDepreciationDailyCost + driverCost;
  const totalRent = totaloperational * dayCount * busCount + (totaloperational * (margin / 100));
  const totalDailyRent = totalRent / dayCount;

  const handleCalculate = () => {
    setCalculated(true);
  };

  const handleClear = () => {
    setBusType("Shuttle");
    setBusCount(1);
    setDayCount(1);
    setDistance({ pool_A: 0, a_B: 0, b_A: 0, b_Pool: 0 });
    setFuelPrice(6800);
    setMaintenancePrice(2086);
    setDepreciationCost(8427234);
    setMargin(10);
    setCalculated(false);
  };

  const handleExportToExcel = () => {
    const invoiceData = [
      ["Result Bus Rent Calculation"],
      ["Bus Type", busType],
      ["Bus Count", busCount],
      ["Day Count", dayCount],
      ["Shift Count", shifCount],
      ["Driver Count", driverCount],
      [""],
      ["Distance Details"],
      ["Pool to A", distance.pool_A],
      ["A to B", distance.a_B],
      ["B to A", distance.b_A],
      ["B to Pool", distance.b_Pool],
      [""],
      ["Cost Breakdown"],
      ["Fuel Price", fuelPrice],
      ["Driver Fee", driverFee],
      ["Maintenance Price", maintenancePrice],
      ["Depreciation Cost", depreciationCost],
      ["Margin", `${margin}%`],
      [""],
      ["Summary"],
      ["Total Km", totalKm],
      ["Fuel Cost", fuelCost],
      ["Driver Cost", driverCost],
      ["Maintenance Cost", maintenanceCost],
      ["Depreciation Cost Daily", totalDepreciationDailyCost],
      ["Depreciation Cost Total", totalDepreciationCost],
      ["Total Operational Cost", totaloperational],
      ["Total Rent", totalRent],
      ["Total Daily Rent", totalDailyRent],
    ];

    const ws = XLSX.utils.aoa_to_sheet(invoiceData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Invoice");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(dataBlob, "Bus_Rent_Invoice.xlsx");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
<<<<<<< HEAD
      <h2 className="text-2xl font-bold mb-6 text-center">🚍 Bus Rent Calculator</h2>
      <BusForm {...{ busType, setBusType, busCount, setBusCount, dayCount, setDayCount, shifCount, setShifCount, driverCount, setDriverCount,tripCount, setTripCount, distance, setDistance, fuelPrice, setFuelPrice, driverFee, setDriverFee, maintenancePrice, setMaintenancePrice, depreciationCost, setDepreciationCost, margin, setMargin }} />
=======
      <h2 className="text-2xl font-bold mb-6 text-center">🚍 Bus Rent Calculators</h2>
      <BusForm {...{ busType, setBusType, busCount, setBusCount, dayCount, setDayCount, shifCount, setShifCount, driverCount, setDriverCount, distance, setDistance, fuelPrice, setFuelPrice, driverFee, setDriverFee, maintenancePrice, setMaintenancePrice, depreciationCost, setDepreciationCost, margin, setMargin }} />
>>>>>>> efb19be0e3fdc375681fa33f148933afc3f230b0
      <div className="flex gap-4 mt-4">
        <button onClick={handleCalculate} className="w-full p-2 bg-blue-500 text-white rounded-lg">🧮 Calculate</button>
        <button onClick={handleClear} className="w-1/4 p-2 bg-gray-500 text-white rounded-lg">❌ Clear</button>
      </div>
      {calculated && (
        <>
          <CalculationResults {...{ totalKm, driverCost, fuelCost, maintenanceCost, totalDepreciationDailyCost, totalDepreciationCost, totaloperational, totalRent, totalDailyRent }} />
          <button onClick={handleExportToExcel} className="mt-4 w-full p-2 bg-green-500 text-white rounded-lg">📥 Export to Excel</button>
        </>
      )}
    </div>
  );
};

export default BusRentCalculator;
