import Button from "@/components/CustomInput/Button/Button";
import KeyViewer from "../../KeyViewer/KeyViewer";
import classes from "./ApiKeys.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import Select from "../Select/Select";
import { useApiKeysQuery } from "@/services/queryApis";
import { useState } from "react";
import { get_apiKeys } from "@/types/apis/apiKeys/get_apiKeys";
import { formatDate, formatText, toSentenceCase } from "@/services/utils";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";
import CreateKey from "../CreateKey/CreateKey";
import RevokeKey from "../RevokeKey/RevokeKey";

const ApiKeys = () => {
  const [type, setType] = useState<"live" | "test">("test");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openRevokeModal, setOpenRevokeModal] = useState(false);

  const {
    data: response,
    isPending,
    isError,
    refetch,
  } = useApiKeysQuery({ type });

  if (isPending) return <LoadingScreen />;

  if (isError) return <ErrorScreen />;

  const data: get_apiKeys | null = response?.data.data[0];

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
          additionalLabelInfo={
            type === "test" ? <div>No real transactions</div> : undefined
          }
          options={["test", "live"]}
          value={toSentenceCase(type)}
          onChange={(value) => {
            if (value === "live" || value === "test") setType(value);
          }}
        />

        {data?.public_key ? (
          <KeyViewer
            value={data?.public_key || ""}
            label="Live Publishable Key"
          />
        ) : null}

        {data?.secret_key ? (
          <KeyViewer
            value={data?.secret_key || ""}
            label="Live Secret Key"
            note="Your secret API key used for server-side API requests. Keep this
        confidential!"
          />
        ) : null}
      </div>

      <div className={classes.line}></div>

      <div className={classes.generatedKeys}>
        <div className={classes.header}>
          <div className={classes.title}>Your API Keys</div>
          <Button onClick={() => setOpenCreateModal(true)}>
            Create New Key
          </Button>
        </div>

        <div className={classes.listItems}>
          {data ? (
            <div className={classes.item}>
              <div>
                <div className={classes.keyName}>
                  {toSentenceCase(data?.type)} API Key
                </div>
                <span className={classes.createdAt}>
                  Created {formatDate(data?.created_at)}
                </span>
                <span className={classes.keyType}>
                  {formatText(data?.type)}
                </span>
              </div>
              <ButtonWrapper
                onClick={() => setOpenRevokeModal(true)}
                className={classes.revokeBtn}
              >
                Revoke
              </ButtonWrapper>
            </div>
          ) : null}
        </div>
      </div>

      {openCreateModal ? (
        <CreateKey
          onClose={() => {
            setOpenCreateModal(false);
          }}
          onSubmit={() => {
            setOpenCreateModal(false);
            refetch();
          }}
          module="apiKey"
        />
      ) : null}

      {openRevokeModal && data ? (
        <RevokeKey
          type={data.type}
          apiKeyId={data?.id}
          onClose={() => {
            setOpenRevokeModal(false);
          }}
          onSubmit={() => {
            setOpenRevokeModal(false);
            refetch();
          }}
        />
      ) : null}
    </div>
  );
};

export default ApiKeys;
