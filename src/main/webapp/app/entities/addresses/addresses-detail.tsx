import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './addresses.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const AddressesDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const addressesEntity = useAppSelector(state => state.addresses.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="addressesDetailsHeading">
          <Translate contentKey="hermesApp.addresses.detail.title">Addresses</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{addressesEntity.id}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="hermesApp.addresses.address">Address</Translate>
            </span>
          </dt>
          <dd>{addressesEntity.address}</dd>
          <dt>
            <span id="addressNo">
              <Translate contentKey="hermesApp.addresses.addressNo">Address No</Translate>
            </span>
          </dt>
          <dd>{addressesEntity.addressNo}</dd>
          <dt>
            <span id="zipCode">
              <Translate contentKey="hermesApp.addresses.zipCode">Zip Code</Translate>
            </span>
          </dt>
          <dd>{addressesEntity.zipCode}</dd>
          <dt>
            <span id="prosfLetter">
              <Translate contentKey="hermesApp.addresses.prosfLetter">Prosf Letter</Translate>
            </span>
          </dt>
          <dd>{addressesEntity.prosfLetter}</dd>
          <dt>
            <span id="nameLetter">
              <Translate contentKey="hermesApp.addresses.nameLetter">Name Letter</Translate>
            </span>
          </dt>
          <dd>{addressesEntity.nameLetter}</dd>
          <dt>
            <span id="letterClose">
              <Translate contentKey="hermesApp.addresses.letterClose">Letter Close</Translate>
            </span>
          </dt>
          <dd>{addressesEntity.letterClose}</dd>
          <dt>
            <span id="firstLabel">
              <Translate contentKey="hermesApp.addresses.firstLabel">First Label</Translate>
            </span>
          </dt>
          <dd>{addressesEntity.firstLabel}</dd>
          <dt>
            <span id="secondLabel">
              <Translate contentKey="hermesApp.addresses.secondLabel">Second Label</Translate>
            </span>
          </dt>
          <dd>{addressesEntity.secondLabel}</dd>
          <dt>
            <span id="thirdLabel">
              <Translate contentKey="hermesApp.addresses.thirdLabel">Third Label</Translate>
            </span>
          </dt>
          <dd>{addressesEntity.thirdLabel}</dd>
          <dt>
            <span id="fourthLabel">
              <Translate contentKey="hermesApp.addresses.fourthLabel">Fourth Label</Translate>
            </span>
          </dt>
          <dd>{addressesEntity.fourthLabel}</dd>
          <dt>
            <span id="fifthLabel">
              <Translate contentKey="hermesApp.addresses.fifthLabel">Fifth Label</Translate>
            </span>
          </dt>
          <dd>{addressesEntity.fifthLabel}</dd>
          <dt>
            <span id="favourite">
              <Translate contentKey="hermesApp.addresses.favourite">Favourite</Translate>
            </span>
          </dt>
          <dd>{addressesEntity.favourite ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="hermesApp.addresses.country">Country</Translate>
          </dt>
          <dd>{addressesEntity.country ? addressesEntity.country.name : ''}</dd>
          <dt>
            <Translate contentKey="hermesApp.addresses.kind">Kind</Translate>
          </dt>
          <dd>{addressesEntity.kind ? addressesEntity.kind.name : ''}</dd>
          <dt>
            <Translate contentKey="hermesApp.addresses.region">Region</Translate>
          </dt>
          <dd>{addressesEntity.region ? addressesEntity.region.name : ''}</dd>
          <dt>
            <Translate contentKey="hermesApp.addresses.company">Company</Translate>
          </dt>
          <dd>{addressesEntity.company ? addressesEntity.company.name : ''}</dd>
          <dt>
            <Translate contentKey="hermesApp.addresses.citizen">Citizen</Translate>
          </dt>
          <dd>{addressesEntity.citizen ? addressesEntity.citizen.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/addresses" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/addresses/${addressesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AddressesDetail;
