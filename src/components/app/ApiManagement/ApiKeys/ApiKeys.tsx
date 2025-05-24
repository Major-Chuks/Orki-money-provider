import Button from "@/components/CustomInput/Button/Button";
import KeyViewer from "../../KeyViewer/KeyViewer";
import classes from "./ApiKeys.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import Select from "../../Select/Select";

const pubKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArvNkXq6k3uVxO0uzxBbt
n8zXfrhQ3QfB4+lJSfR3zqUywlzXwPfGrVxR/BXocNO1FQy9BBnyEN+E1AmIxnfd
kxuFQz0L2l5w0aLt0zUewbC3zLrX1YurQbPvjV1pbx6b+M6WJSanFYu7aK3txSqp
uKMe+W2wVQW6IcvOQJ3E5XqZKu0ZhnRJrqOeOwoRU2QXJ4pmkDaJu5RHa2Ak+mgS
zOBM3Y6X2Q2RJcUav1U0CL4ZocK4B5eJbmVko2STUGJ3sbEjpiTzM7lnScsmZvcS
Wbq5szxQrZyPKbKp0sTmKN0KWT8bz3KvqFdIjUgjOX8tCeC61vZME3RyTVGHrxcy
YQIDAQAB`;

const secretKey = "zLrX1YurQbPvjV1pbx6b+M6WJSanFYu7aK3txSqpuKMe+W2wVQW";

const ApiKeys = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>API Keys</div>
      <div className={classes.description}>
        Your API keys provide secure access to Orki Terminal&apos;s payment
        services.
      </div>

      <div className={classes.inputWrapper}>
        <Select
          label="Environment"
          additionalLabelInfo={<div>No real transactions</div>}
          options={["Test Environment", "Prod Environment"]}
          onChange={() => {}}
        />

        <KeyViewer value={pubKey} label="Live Publishable Key" />

        <div>
          <KeyViewer
            value={secretKey}
            label="Live Secret Key"
            note="Your secret API key used for server-side API requests. Keep this
            confidential!"
          />
        </div>
      </div>

      <div className={classes.line}></div>

      <div className={classes.generatedKeys}>
        <div className={classes.header}>
          <div className={classes.title}>Your API Keys</div>
          <Button>Create New Key</Button>
        </div>

        <div className={classes.listItems}>
          {[...Array(2)].map((el, idx) => (
            <div key={idx} className={classes.item}>
              <div>
                <div className={classes.keyName}>Test API Key</div>
                <span className={classes.createdAt}>Created 15/04/2023</span>
                <span className={classes.keyType}>test</span>
              </div>
              <ButtonWrapper className={classes.revokeBtn}>
                Revoke
              </ButtonWrapper>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;
