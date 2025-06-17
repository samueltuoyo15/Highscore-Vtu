import { useState } from "react";
import SweetAlert2, { SweetAlert2Props } from "react-sweetalert2";

type AlertProps = Partial<SweetAlert2Props> & { show?: boolean };

export const useAlert = () => {
  const [swalProps, setSwalProps] = useState<AlertProps>({});

  const triggerAlert = (props: AlertProps) => {
    setSwalProps({
      show: true,
      ...props,
    });
  };

  const Alert = (
    <SweetAlert2
      {...swalProps}
      onConfirm={() => setSwalProps({})}
      didClose={() => setSwalProps({})}
    />
  );

  return { Alert, triggerAlert };
};
