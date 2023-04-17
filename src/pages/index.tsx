import jwtDecode from 'jwt-decode';
import {
  Nav, Navbar, Container,
} from 'react-bootstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { UserTypes } from '../cores/types/user.dto';
import OffcanvasMenu from '../components/atoms/offcanvas-menus';
import AwardContent from '../components/molecules/contents';
import OffcanvasFilter from '../components/atoms/offcanvas-filters';
import getAwardsService from "../services/award";
import { AwardGetRequestParamTypes } from '../cores/types/award.dto';

export default function Home() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);

  const onClickMenuShow = () => setIsShowMenu(true);
  const onClickMenuClose = () => setIsShowMenu(false);
  const onClickFilterShow = () => setIsShowFilter(true);
  const onClickFilterClose = () => setIsShowFilter(false);

  const awardTypes = ["Vouchers", "Products", "Giftcards"];

  const [minPointNeeded, setMinPointNeeded] = useState(0);
  const maxPointNeeded: number = 500000;

  const [isFilterByPointNeeded, setIsFilterByPointNeeded] = useState(false);
  const [isFilterByType, setIsFilterByType] = useState(false);

  const [checkboxTypeAll, setCheckboxTypeAll] = useState(false);
  const [checkboxTypes, setCheckboxTypes] = useState(Array<string>);

  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = {
    page: 1,
    page_size: 3,
    type: checkboxTypes.join(", "),
    min_point: minPointNeeded,
    max_point: maxPointNeeded,
  };

  const getAwardsData = useCallback(async (value: AwardGetRequestParamTypes) => {
    setLoading(true);
    const response = await getAwardsService(value);
    setAwards(response.data.data.data.results);
    setLoading(false);
  }, [getAwardsService]);

  useEffect(() => {
    getAwardsData(params);
  }, []);

  const onClickFilter = () => {
    getAwardsData(params);
    onClickFilterClose();
  };

  const onChangeFilterPointNeeded = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value, 10) === 0) {
      setIsFilterByPointNeeded(false);
    } else {
      setIsFilterByPointNeeded(true);
    }

    setMinPointNeeded(parseInt(e.target.value, 10));
  };

  const onChangeFilterTypeAll = (value: boolean) => {
    setCheckboxTypeAll(value);
    setCheckboxTypes(awardTypes);
    if (!value) {
      setCheckboxTypes([]);
      setIsFilterByType(false);
    } else {
      setIsFilterByType(true);
    }
  };

  const onChangeFilterTypeOther = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedTypes = [...checkboxTypes];

    if (e.target.checked) {
      updatedTypes = [...checkboxTypes, e.target.value];
    } else {
      updatedTypes.splice(checkboxTypes.indexOf(e.target.value), 1);
      setCheckboxTypeAll(false);
    }

    if (awardTypes.length === updatedTypes.length) {
      setCheckboxTypeAll(true);
    }

    if (updatedTypes.length) {
      setIsFilterByType(true);
    } else {
      setIsFilterByType(false);
    }

    setCheckboxTypes(updatedTypes);
  };

  const onClickFilterClear = () => {
    getAwardsData({
      page: params.page,
      page_size: params.page_size,
      type: "",
      min_point: 0,
      max_point: maxPointNeeded,
    });

    onClickFilterClose();
  };

  return (
    <>
      <Container>
        <Navbar bg="light" expand="lg" className="fixed-top bg-body-tertiary justify-content-between">
          <Container className="m-3" fluid>
            <Nav.Link href="#" onClick={onClickMenuShow}>
              <i className="fa-solid fa-bars" />
            </Nav.Link>
            <Nav.Link href="#">
              <h5 className="mb-0">
                AWARDS
              </h5>
            </Nav.Link>
            <Nav.Link href="#" onClick={onClickFilterShow}>
              <i className="fa-solid fa-filter" />
            </Nav.Link>
          </Container>
        </Navbar>
        <AwardContent awardsData={awards} isLoading={loading} />
      </Container>

      <OffcanvasMenu isShow={isShowMenu} handleHide={onClickMenuClose} />

      <OffcanvasFilter
        isShow={isShowFilter}
        handleHide={onClickFilterClose}
        isFilterByPointNeeded={isFilterByPointNeeded}
        isFilterByType={isFilterByType}
        minPointNeeded={minPointNeeded}
        maxPointNeeded={maxPointNeeded}
        checkboxTypes={checkboxTypes}
        handleFilterPointNeeded={onChangeFilterPointNeeded}
        checkboxTypeAll={checkboxTypeAll}
        onChangeFilterTypeAll={onChangeFilterTypeAll}
        types={awardTypes}
        handleFilterTypeOther={onChangeFilterTypeOther}
        handleFilterClear={onClickFilterClear}
        handleFilterAction={onClickFilter}
      />
    </>

  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, 'base64').toString('ascii');
  const payload: UserTypes = jwtDecode(jwtToken);
  const userFromPayload: UserTypes = payload;

  return {
    props: {
      user: userFromPayload,
    },
  };
}
