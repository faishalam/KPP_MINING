"use client";

import { Box, Modal } from "@mui/material";
import { CInput } from "@/components/componentsV2/atoms";
import ButtonSubmit from "@/components/button/ButtonSubmit";
import { BlockingLoader } from "@/components/componentsV2/atoms/loader";
import useProgressAssetManagement from "../hooks";

const ModalUpdateProgressCapex = () => {
  const {
    openModalProgressCapex,
    setOpenModalProgressCapex,
    progressCapex,
    setProgressCapex,
    isLoadingMutateEditCapex,
    onSubmitUpdateCapex,
  } = useProgressAssetManagement();

  return (
    <>
      <div>
        <div className="">
          <Modal
            open={openModalProgressCapex}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="max-w-full w-full flex justify-center items-center px-60"
          >
            <Box className="max-w-[50vh] h-[20vh] bg-white w-full rounded-md ">
              {isLoadingMutateEditCapex && <BlockingLoader />}
              <div className="w-full border-b-2">
                <p className="font-semibold text-lg p-5 text-[#003433]">
                  Update Progress Capex Multiple
                </p>
              </div>
              <div className="max-w-full w-full h-full flex flex-col bg-white rounded-md p-4">
                <CInput
                  label="Progress Capex*"
                  className="w-full"
                  placeholder="Enter progress capex"
                  value={progressCapex}
                  autoComplete="off"
                  onChange={(e) => setProgressCapex(e.target.value)}
                />
                <div className="px-4 mt-10">
                  <div className="flex gap-2 w-full max-w-full justify-end">
                    <ButtonSubmit
                      type={"button"}
                      classname={
                        "w-[100px] max-w-full text-sm rounded-md bg-white hover:bg-gray-50 text-black border p-2"
                      }
                      btnText="Cancel"
                      onClick={() => {
                        setProgressCapex("");
                        setOpenModalProgressCapex(false);
                      }}
                    />
                    <ButtonSubmit
                      type={"submit"}
                      classname={
                        "w-[100px] max-w-full rounded-md text-sm bg-[#154940] hover:bg-[#0e342d] text-white p-2"
                      }
                      btnText="Save"
                      onClick={() => {
                        onSubmitUpdateCapex();
                      }}
                    />
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
};
export default ModalUpdateProgressCapex;
