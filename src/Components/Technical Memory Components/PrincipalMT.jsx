import React, { useState } from "react";
import "./PrincipalMT.css";
import axios from "axios";

function GeneralMT() {
  const [infoToShow, setInfoToShow] = useState([]);
  const [consoleId, setConsoleId] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const handleButtonClick = async () => {
    if (selectedService !== "EC2") {
      console.log(
        "Selecciona Amazon Elastic Compute Cloud (EC2) para obtener resultados."
      );
      return;
    }

    try {
      const response = await axios.get(
        `https://n3822cjt4i.execute-api.us-east-1.amazonaws.com/ec2info?console_id=${consoleId}`
      );
      setInfoToShow(response.data);
    } catch (error) {
      console.error("Error al obtener la información:", error);
    }
  };

  const isServiceSelected = selectedService === "";

  const handleCopyClick = (value) => {
    navigator.clipboard
      .writeText(value)
      .then(() => console.log("Valor copiado: ", value))
      .catch((error) => console.error("Error al copiar el valor: ", error));
  };

  return (
    <div id="fullFrame">
      <header id="header">ImplementaTecnia</header>
      <div id="DivPrincipal">
        <div id="divContenido">
          <div id="divIDcondola">
            <h3>ID de consola</h3>
            <input
              className="inputs"
              type="number"
              value={consoleId}
              onChange={(e) => setConsoleId(e.target.value)}
            />
            <h3>Servicios</h3>
            <select
              className="inputs"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="" disabled hidden>
                Seleccionar...
              </option>
              <option value="EC2">Amazon Elastic Compute Cloud (EC2)</option>
              <option value="VPC">Virtual Private Cloud (VPC)</option>
              <option value="KMS">Key Management Service (KMS)</option>
              <option value="ALB">Application Load Balancer (ALB)</option>
              <option value="NLB">Network Load Balancer (NLB)</option>
              <option value="RDS">Relational Database Service (RDS)</option>
            </select>
            {isServiceSelected && (
              <small className="error">Selecciona un servicio.</small>
            )}
          </div>
          <button onClick={handleButtonClick} disabled={isServiceSelected}>
            Mostrar Información
          </button>
        </div>
        {infoToShow.length > 0 && (
          <div id="ec2info">
            {infoToShow.map((info, index) => (
              <div key={index} className="infoContainer animate">
                <h3>Información del Servidor {info.ServerName}</h3>
                <p>
                  InstanceID: {info.InstanceId}
                  <button
                    className="copyButton"
                    onClick={() => handleCopyClick(info.InstanceId)}
                  >
                    Copiar
                  </button>
                </p>
                <p>
                  Server Name: {info.ServerName}
                  <button
                    className="copyButton"
                    onClick={() => handleCopyClick(info.ServerName)}
                  >
                    Copiar
                  </button>
                </p>
                <p>
                  Region: {info.Region}
                  <button
                    className="copyButton"
                    onClick={() => handleCopyClick(info.Region)}
                  >
                    Copiar
                  </button>
                </p>
                <p>
                  Subnet Name: {info.SubnetName}
                  <button
                    className="copyButton"
                    onClick={() => handleCopyClick(info.SubnetName)}
                  >
                    Copiar
                  </button>
                </p>
                <p>
                  Instance Type: {info.InstanceType}
                  <button
                    className="copyButton"
                    onClick={() => handleCopyClick(info.InstanceType)}
                  >
                    Copiar
                  </button>
                </p>
                <p>
                  Public IP: {info.PublicIp}
                  <button
                    className="copyButton"
                    onClick={() => handleCopyClick(info.PublicIp)}
                  >
                    Copiar
                  </button>
                </p>
                <p>
                  Private IP: {info.PrivateIp}
                  <button
                    className="copyButton"
                    onClick={() => handleCopyClick(info.PrivateIp)}
                  >
                    Copiar
                  </button>
                </p>
                <p>
                  Key Name: {info.KeyName}
                  <button
                    className="copyButton"
                    onClick={() => handleCopyClick(info.KeyName)}
                  >
                    Copiar
                  </button>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GeneralMT;
