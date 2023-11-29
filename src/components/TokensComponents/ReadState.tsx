import { ProgramMetadata } from "@gear-js/api";
import { Button } from "@gear-js/ui";
import { useState } from "react";
import { useApi, useAlert } from "@gear-js/react-hooks";
import { AnyJson } from "@polkadot/types/types";

function ReadState() {
  const { api } = useApi();

  const alert = useAlert();

  const [fullState, setFullState] = useState<AnyJson>();

 // Add your programID
 const programIDFT =
 "0xd46f5f0fba63bff9a43f6d4cca46d09ef0955b024e1bb70851dad96391c69986";

// Add your metadata.txt
const meta =
 "00010001000000000001030000000107000000000000000108000000a90b3400081466745f696f28496e6974436f6e66696700000c01106e616d65040118537472696e6700011873796d626f6c040118537472696e67000120646563696d616c73080108753800000400000502000800000503000c081466745f696f204654416374696f6e000118104d696e74040010011075313238000000104275726e040010011075313238000100205472616e736665720c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380002001c417070726f7665080108746f14011c4163746f724964000118616d6f756e74100110753132380003002c546f74616c537570706c790004002442616c616e63654f66040014011c4163746f724964000500001000000507001410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001801205b75383b2033325d0000180000032000000008001c081466745f696f1c46544576656e74000110205472616e736665720c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380000001c417070726f76650c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380001002c546f74616c537570706c790400100110753132380002001c42616c616e63650400100110753132380003000020081466745f696f3c496f46756e6769626c65546f6b656e00001801106e616d65040118537472696e6700011873796d626f6c040118537472696e67000130746f74616c5f737570706c791001107531323800012062616c616e6365732401505665633c284163746f7249642c2075313238293e000128616c6c6f77616e6365732c01905665633c284163746f7249642c205665633c284163746f7249642c2075313238293e293e000120646563696d616c730801087538000024000002280028000004081410002c00000230003000000408142400";

  const metadata = ProgramMetadata.from(meta);

  
  const getState = () => {

    api.programState
      .read({ programId: programIDFT,payload:"" }, metadata)
      .then((result) => {
        setFullState(result.toJSON());
        alert.success("Successful state");
      })
      .catch(({ message }: Error) => alert.error(message));
  };

  return (
    <div className="container">
      <div>Full State</div>
      <div className="state">
        State
        <p className="text"> {JSON.stringify(fullState)}</p>
      </div>
      <Button text="Get Full State" onClick={getState} />
    </div>
  );
}

export { ReadState };
