import Image from "next/image";
// eslint-disable-next-line import/no-extraneous-dependencies
import cx from 'classnames';
import { NumericFormat } from "react-number-format";

interface ListItemAwardProps {
  imgUrl: string,
  title: string,
  pointNeeded: number,
  type: string
}

export default function ListItemAward(props: ListItemAwardProps) {
  const {
    imgUrl, title, pointNeeded, type,
  } = props;

  const typeBadge = cx({
    // eslint-disable-next-line quote-props
    'badge': true,
    'text-bg-primary': type === 'Vouchers',
    'text-bg-danger': type === 'Products',
    'text-bg-secondary': type === 'Giftcards',
  });

  return (
    <div className="col-lg-4 mb-3 align-items-stretch">
      <div className="card">
        <Image
          src={imgUrl}
          className="card-img-top"
          alt="Card Image"
          width={100}
          height={100}
          loading="lazy"
        />
        <div className="card-body flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text mb-4">
            <NumericFormat value={pointNeeded} displayType="text" thousandSeparator="." decimalSeparator="," />
            {' '}
            Point
          </p>
          <span className={typeBadge}>{type}</span>
        </div>
      </div>
    </div>
  );
}
