"use client";

import { useRecordStore } from "@/store/RecordStore";
import { RadioGroup } from "@headlessui/react";
import { CheckCircle } from "lucide-react";

function AppointmentTypeRadioGroup() {
  const [newAppointmentType, setNewAppointmentType] = useRecordStore(
    (state) => [state.newAppointmentType, state.setNewAppointmentType]
  );
  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup
          value={newAppointmentType}
          onChange={(e) => setNewAppointmentType(e)}
        >
          <div className="space-y-2">
            {types.map((type) => (
              <RadioGroup.Option
                key={type.id}
                value={type.id}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  } ${
                    checked
                      ? `${type.color} bg-opacity-75 text-white`
                      : "bg-white"
                  }
                  relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus: outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className=" text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {type.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-white" : "text-gray-500"
                            }`}
                          >
                            <span>{type.description}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                    </div>
                    {checked && (
                      <div className="shrink-0 text-white">
                        <CheckCircle />
                      </div>
                    )}
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
const types = [
  {
    id: "general",
    name: "General Checkup",
    description:
      "Schedule a new appointment for a routine checkup with a healthcare professional.",
    color: "bg-blue-400",
  },
  {
    id: "heart",
    name: "Cardiology Consultation",
    description:
      "Book an appointment for ongoing care or consultation related to heart health.",
    color: "bg-blue-400",
  },
  {
    id: "bone",
    name: "Orthopedic Evaluation",
    description:
      "Arrange an appointment for orthopedic assessment or follow-up on musculoskeletal issues.",
    color: "bg-blue-400",
  },
  {
    id: "kidney",
    name: "Nephrology Session",
    description:
      "Schedule a session with a nephrologist for kidney-related concerns or follow-up.",
    color: "bg-blue-600",
  },
  {
    id: "eye",
    name: "Ophthalmology Appointment",
    description:
      "Book an appointment with an eye specialist for eye health examination or concerns.",
    color: "bg-blue-600",
  },
];

export default AppointmentTypeRadioGroup;
