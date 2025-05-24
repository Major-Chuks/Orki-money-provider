import CloseIcon from "@/assets/app/CloseIcon";
import classes from "./TransactionDetails.module.css";
import ButtonWrapper from "@/components/CustomInput/ButtonWrapper/ButtonWrapper";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import TooltipIcon from "@/assets/app/TooltipIcon";
import ModalLayout from "../../Modals/ModalLayout";

const TransactionDetails = ({ onClose }: { onClose: () => void }) => {
  return (
    <ModalLayout onClose={onClose}>
      {({ close }) => (
        <div className={classes.modal}>
          <div className={classes.header}>
            <div className={classes.headerTitle}>Transaction TXN–12345</div>
            <ButtonWrapper onClick={close} className={classes.close}>
              <CloseIcon />
            </ButtonWrapper>
          </div>

          <div className={classes.section}>
            <div className={classes.sectionTitle}>Transaction Details</div>
            <div className={classes.detailsGrid}>
              <div className={classes.item}>
                <div className={classes.name}>Onramp Transaction ID</div>
                <div className={classes.value}>TXN–12345</div>
              </div>
              <div className={classes.item}>
                <div className={classes.name}>Partner ID</div>
                <div className={classes.value}>PRT–001</div>
              </div>
              <div className={classes.item}>
                <div className={classes.name}>Status</div>
                <div className={classes.status}>Success</div>
              </div>
              <div className={classes.item}>
                <div className={classes.name}>Provider</div>
                <div className={classes.value}>Transak</div>
              </div>
              <div className={classes.item}>
                <div className={classes.name}>Date & Time</div>
                <div className={classes.value}>2023–04–28 15:30:22</div>
              </div>
              <div className={classes.item}>
                <div className={classes.name}>Transaction Type</div>
                <div className={classes.value}>Buy</div>
              </div>
            </div>
          </div>

          <div className={classes.section}>
            <div className={classes.sectionTitle}>
              Amount Details
              <div
                data-tooltip-id="amount-tooltip"
                data-tooltip-content="Address where the crypto was delivered"
                className={classes.tooltipContainer}
              >
                <TooltipIcon />
              </div>
              <Tooltip
                id="amount-tooltip"
                style={{ fontSize: "12px", fontFamily: "DM Sans" }}
              />
            </div>

            <div className={classes.detailsColumn}>
              <div className={classes.item}>
                <div className={classes.name}>Wallet Address</div>
                <div className={classes.address}>1aZtPe...v7biN4a </div>
              </div>

              <div className={classes.item}>
                <div className={classes.name}>Transaction Hash</div>
                <div className={classes.hash}>06879da...3d7b8ce0f </div>
              </div>

              <div className={classes.dataFlex}>
                <div className={classes.item}>
                  <div className={classes.name}>Fiat Amount</div>
                  <div style={{ fontWeight: "700" }} className={classes.value}>
                    1250.00 USD
                  </div>
                </div>
                <div className={classes.item}>
                  <div className={classes.name}>Crypto Amount</div>
                  <div style={{ fontWeight: "700" }} className={classes.value}>
                    0.0215 BTC
                  </div>
                </div>
                <div className={classes.item}>
                  <div className={classes.name}>Exchange Rate</div>
                  <div className={classes.value}>1 BTC = 58139.53 USD</div>
                </div>
                <div className={classes.item}>
                  <div className={classes.name}>Payment Method</div>
                  <div className={classes.value}>Credit Card</div>
                </div>
                <div className={classes.item}>
                  <div className={classes.name}>Network</div>
                  <div className={classes.value}>Bitcoin</div>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.section}>
            <div className={classes.sectionTitle}>Fee Breakdown</div>
            <div className={classes.dataFlex}>
              <div className={classes.item}>
                <div className={classes.name}>Network Fee</div>
                <div className={classes.value}>0.50 USD</div>
              </div>
              <div className={classes.item}>
                <div className={classes.name}>Provider Fee</div>
                <div className={classes.value}>12.50 USD</div>
              </div>
              <div className={classes.item}>
                <div className={classes.name}>Orki Fee</div>
                <div className={classes.value}>6.25 USD</div>
              </div>
              <div className={classes.line}></div>
              <div className={classes.item}>
                <div className={classes.total}>Total Fee</div>
                <div className={classes.total}>19.25 USD</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ModalLayout>
  );
};

export default TransactionDetails;
