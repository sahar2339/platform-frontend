/// <reference types="vite-plugin-svgr/client" />
import CloseIcon from "@/assets/x-close.svg?react";
import React from "react";
import Typography from "@/components/typography/Typography";
import Modal from "@components/modal/Modal";
import Input from "@components/form/input/Input";
import Select from "@components/form/select/Select";
import Button from "@components/button/Button";
import { usePostProject } from "@hooks/projects/usePostProject";
import Spinner from "@components/spinner/Spinner";
import { useHierarchies } from "@hooks/hierarchies/useHierarchies";
import ErrorOccuredModal from "@components/errorOccured/ErrorOccured";

type AddMemberModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddMemberModal = React.memo(({ setShowModal }: AddMemberModalProps) => {
  const {
    register,
    handleSubmit,
    formErrors,
    onSubmit,
    isLoading,
    isSuccess,
    error,
  } = usePostProject();

  React.useEffect(() => {
    if (isSuccess) setShowModal(false);
  }, [isSuccess, setShowModal]);

  return (
    <Modal darkenBackground={true}>
      {isLoading ? (
        <div className="bg-mono/basic-12 border border-mono/basic-10 h-85 w-150 flex flex-col py-8 px-10 rounded-md">
          <Spinner />
        </div>
      ) : error ? (
        <ErrorOccuredModal
          error="Oops! Project Creation Failed"
          details="We encountered an issue while creating your new project."
          setShowModal={setShowModal}
        />
      ) : (
        <div className="flex flex-col items-center justify-center relative">
          <CloseIcon
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setShowModal((prev) => !prev)}
          />
          <div className="bg-mono/basic-12 border border-mono/basic-10 h-85 w-150 flex flex-col py-8 px-10 rounded-md">
            <Typography
              variant="headline-lg"
              className="text-mono/basic-1 gap-2 mb-2 h-8"
            >
              Add member to project 
            </Typography>

            <Typography variant="body-xl" className="text-mono/basic-2" >
            Team members have accounts on the RCS Amplify system and can create new apps or change their settings, depending on their permissions.
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              
              <div className="flex items-center justify-between top-4 mt-4">
              <Input
                type="text"
                {...register("username", {
                  required: "username is required",
                })}
                error={formErrors.name?.message as string}
                label="Account username*"
                autoComplete="off"
                placeholder="Insert username..."
              />
   

                <Select
                  {...register("role", {
                    required: "role is required",
                  })}
                  label="Role*"
                  options={["test"]}
                  placeholder="Insert role"
                  error={formErrors.hierarchy?.message as string}
                />
              

              </div>
              <div className="flex items-center justify-between pt-3 h-13">
                <Button
                  variant="primary"
                  className="w-[140px]"
                  onClick={handleSubmit(onSubmit)}
                >
                  Add member
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowModal((prev) => !prev)}
                >
                  Close
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Modal>
  );
});

export default AddMemberModal;
