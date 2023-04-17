import React from "react";
import {
  Badge, Button, Form, Offcanvas, Container,
} from "react-bootstrap";
import { NumericFormat } from "react-number-format";

interface OffcanvasFilterProps {
  isShow: boolean
  handleHide: () => void
  isFilterByPointNeeded: boolean
  isFilterByType: boolean
  minPointNeeded: number
  maxPointNeeded: number
  checkboxTypes: Array<string>
  handleFilterPointNeeded: (e: React.ChangeEvent<HTMLInputElement>) => void
  checkboxTypeAll: boolean
  onChangeFilterTypeAll: (v: boolean) => void
  types: Array<string>
  handleFilterTypeOther: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFilterClear: () => void
  handleFilterAction: () => void
}

export default function OffcanvasFilter(props: OffcanvasFilterProps) {
  const {
    isShow, handleHide, isFilterByPointNeeded, isFilterByType,
    minPointNeeded, maxPointNeeded, checkboxTypes, handleFilterPointNeeded,
    checkboxTypeAll, onChangeFilterTypeAll, types, handleFilterTypeOther,
    handleFilterClear, handleFilterAction,
  } = props;

  return (
    <Offcanvas show={isShow} onHide={handleHide} placement="end" name="end" className="w-100">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filter</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          {(isFilterByPointNeeded || isFilterByType) && (
          <Form.Group className="mb-3">
            {isFilterByPointNeeded && (
            <h5>
              <Badge bg="primary">
                Point:
                {' '}
                <NumericFormat value={minPointNeeded} prefix="IDR " displayType="text" thousandSeparator="." decimalSeparator="," />
                {' '}
                -
                {' '}
                <NumericFormat value={maxPointNeeded} prefix="IDR " displayType="text" thousandSeparator="." decimalSeparator="," />
              </Badge>
            </h5>
            )}
            {isFilterByType && (
            <h5>
              <Badge bg="primary" className="text-capitalize">
                Type:
                {' '}
                {checkboxTypes.join(", ")}
              </Badge>
            </h5>
            )}
            <Button variant="primary" onClick={handleFilterClear}>Clear All Filter</Button>
          </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">
              Poin Needed
            </Form.Label>
            <div className="d-flex justify-content-between">
              <div className="p-2 fw-medium">
                <NumericFormat value={minPointNeeded} prefix="IDR " displayType="text" thousandSeparator="." decimalSeparator="," />
              </div>
              <div className="p-2 fw-medium">
                <NumericFormat value={maxPointNeeded} prefix="IDR " displayType="text" thousandSeparator="." decimalSeparator="," />
              </div>
            </div>
            <Form.Range
              min={0}
              max={maxPointNeeded}
              onChange={handleFilterPointNeeded}
              value={minPointNeeded}
              step={10000}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="fw-medium">Awards Type</Form.Label>
            <Form.Check
              key="all"
              type="checkbox"
              id="all"
              label="All Type"
              value="all"
              checked={checkboxTypeAll}
              onChange={(e) => onChangeFilterTypeAll(e.target.checked)}
              className="mt-2"
            />
            {types.map((e) => (
              <Form.Check
                key={e}
                type="checkbox"
                id={e}
                label={e}
                value={e}
                checked={checkboxTypes.some(
                  (checkboxType) => checkboxType === e,
                )}
                onChange={handleFilterTypeOther}
                className="mt-2"
              />
            ))}
          </Form.Group>
        </Form>
      </Offcanvas.Body>
      <Container className="mx-auto my-3">
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" onClick={handleFilterAction}>
            Filter
          </Button>
        </div>
      </Container>
    </Offcanvas>
  );
}
