"use client";
import { FormEvent, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { useRecordStore } from "@/store/RecordStore";
import AppointmentTypeRadioGroup from "./AppointmentTypeRadioGroup";
import AppointmentDateTimePicker from "./AppointmentDateTimePicker";

function Modal() {
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);

  const [
    doctor,
    patient,
    datetime,
    setDoctor,
    setPatient,
    newAppointmentType,
    newAppointment,
    setNewAppointment,
    addAppointment,
  ] = useRecordStore((state) => [
    state.doctorName,
    state.patientName,
    state.datetime,
    state.setDoctorName,
    state.setPatientName,
    state.newAppointmentType,
    state.newAppointment,
    state.setNewAppointment,
    state.addAppointment,
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newAppointment) return;

    //  Add Appointment Function
    addAppointment(
      newAppointment,
      newAppointmentType,
      patient,
      doctor,
      datetime
    );

    closeModal();
  };

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        onSubmit={handleSubmit}
        className="relative z-50"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2"
                >
                  Add a Appointment
                </Dialog.Title>
                <div className="mt-2 space-y-2">
                  <input
                    type="text"
                    value={newAppointment}
                    onChange={(e) => setNewAppointment(e.target.value)}
                    placeholder="Enter a Appointment here..."
                    className="w-full border bg-white text-black border-gray-300 rounded-md outline-none p-5"
                  />
                  <input
                    type="text"
                    value={patient}
                    onChange={(e) => setPatient(e.target.value)}
                    placeholder="Enter Patient's Name here..."
                    className="w-full border bg-white text-black border-gray-300 rounded-md outline-none p-5"
                  />
                  <input
                    type="text"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    placeholder="Enter Doctor's Name here..."
                    className="w-full border bg-white text-black border-gray-300 rounded-md outline-none p-5"
                  />
                </div>

                {/* Radio */}
                <AppointmentTypeRadioGroup />
                <AppointmentDateTimePicker />

                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={!newAppointment}
                    className="inline-flex justify-center rounded-md border border-transparent bg-orange-200 px-4 py-2 text-sm font-medium text-orange-900
                   hover:bg-orange-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2
                    disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Appointment
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
