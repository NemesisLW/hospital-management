import { useRecordStore } from "@/store/RecordStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AppointmentDateTimePicker() {
  const [datetime, setDatetime] = useRecordStore((state) => [
    state.datetime,
    state.setDateTime,
  ]);
  return (
    <DatePicker
      showIcon
      selected={datetime}
      onChange={(date) => setDatetime(date!)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MM/dd/yyyy h:mm aa"
      className="w-full border bg-white text-black border-gray-300 rounded-md outline-none p-5"
    />
  );
}

export default AppointmentDateTimePicker;
