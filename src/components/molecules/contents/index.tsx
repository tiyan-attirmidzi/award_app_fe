import Image from "next/image";
import { AwardTypes } from "../../../cores/types/award.dto";
import ListItemAward from "./ListItemAward";

interface AwardContentProps {
  awardsData: Array<AwardTypes>
  isLoading: boolean
}

export default function AwardContent(props: AwardContentProps) {
  const { awardsData, isLoading } = props;

  return (
    <section className="pt-5 pb-5">
      <div className="container mt-5">
        <div className="row">

          {!isLoading ? (awardsData.length !== 0 ? awardsData.map((award: AwardTypes) => (
            <ListItemAward
              key={award.id}
              title={award.name}
              pointNeeded={award.exchange_points}
              imgUrl={award.image}
              type={award.type}
            />
          )) : (
            <div className="mt-5 text-center">
              <Image
                src="/images/award.png"
                className="Image-fluid gradient-main"
                alt="Award Logo"
                width={128}
                height={128}
              />
              <h4 className="text-secondary m-5">No Awards Found</h4>
            </div>
          )) : (
            <div className="text-center mt-5">
              <div className="spinner-border spinner-load" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-secondary">Please wait...</p>
            </div>
          )}

        </div>
      </div>
    </section>

  );
}
