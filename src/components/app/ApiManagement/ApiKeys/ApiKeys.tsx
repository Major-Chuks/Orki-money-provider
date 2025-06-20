import Button from "@/components/CustomInput/Button/Button";
import KeyViewer from "../../KeyViewer/KeyViewer";
import classes from "./ApiKeys.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import Select from "../Select/Select";
import {
  useApiKeyMutation,
  useApiKeysQuery,
  useCreateApiKeyMutation,
} from "@/services/queryApis";
import { useState } from "react";
import { get_apiKeys } from "@/types/apis/apiKeys/get_apiKeys";
import { formatDate, toSentenceCase } from "@/services/utils";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";

const ApiKeys = () => {
  const [type, setType] = useState<"live" | "test">("test");

  const {
    data: response,
    isPending,
    isError,
    refetch,
  } = useApiKeysQuery({ type });
  const { mutate: createApiKey, isPending: isCreatePending } =
    useCreateApiKeyMutation();
  const { mutate: revokeApiKey, isPending: isRevokePending } =
    useApiKeyMutation();

  const handleCreate = async () => {
    createApiKey(
      { type },
      {
        onSuccess: (response) => {
          console.log(response);
          refetch();
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const handleRevoke = () => {
    if (!data) return;
    revokeApiKey(
      { apiKeyId: data?.id },
      {
        onSuccess: (response) => {
          console.log(response);
          refetch();
        },
      }
    );
  };

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
          additionalLabelInfo={<div>No real transactions</div>}
          options={["test", "live"]}
          value={toSentenceCase(type)}
          onChange={(value) => {
            if (value === "live" || value === "test") setType(value);
          }}
        />

        <KeyViewer
          value={data?.public_key || ""}
          label="Live Publishable Key"
        />

        <div>
          <KeyViewer
            value={data?.secret_key || ""}
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
          <Button loading={isCreatePending} onClick={handleCreate}>
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
                <span className={classes.keyType}>{data?.type}</span>
              </div>
              <ButtonWrapper
                loading={isRevokePending}
                onClick={handleRevoke}
                className={classes.revokeBtn}
              >
                Revoke
              </ButtonWrapper>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;
