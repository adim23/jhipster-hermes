import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './cities.reducer';
import { ICities } from 'app/shared/model/cities.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Cities = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const citiesList = useAppSelector(state => state.cities.entities);
  const loading = useAppSelector(state => state.cities.loading);
  const totalItems = useAppSelector(state => state.cities.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const { match } = props;

  return (
    <div>
      <h2 id="cities-heading" data-cy="CitiesHeading">
        <Translate contentKey="hermesApp.cities.home.title">Cities</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hermesApp.cities.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hermesApp.cities.home.createLabel">Create new Cities</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {citiesList && citiesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="hermesApp.cities.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="hermesApp.cities.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('president')}>
                  <Translate contentKey="hermesApp.cities.president">President</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('presidentsPhone')}>
                  <Translate contentKey="hermesApp.cities.presidentsPhone">Presidents Phone</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('secretary')}>
                  <Translate contentKey="hermesApp.cities.secretary">Secretary</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('secretarysPhone')}>
                  <Translate contentKey="hermesApp.cities.secretarysPhone">Secretarys Phone</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('police')}>
                  <Translate contentKey="hermesApp.cities.police">Police</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('policesPhone')}>
                  <Translate contentKey="hermesApp.cities.policesPhone">Polices Phone</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('doctor')}>
                  <Translate contentKey="hermesApp.cities.doctor">Doctor</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('doctorsPhone')}>
                  <Translate contentKey="hermesApp.cities.doctorsPhone">Doctors Phone</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('teacher')}>
                  <Translate contentKey="hermesApp.cities.teacher">Teacher</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('teachersPhone')}>
                  <Translate contentKey="hermesApp.cities.teachersPhone">Teachers Phone</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('priest')}>
                  <Translate contentKey="hermesApp.cities.priest">Priest</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('priestsPhone')}>
                  <Translate contentKey="hermesApp.cities.priestsPhone">Priests Phone</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesApp.cities.country">Country</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesApp.cities.region">Region</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {citiesList.map((cities, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${cities.id}`} color="link" size="sm">
                      {cities.id}
                    </Button>
                  </td>
                  <td>{cities.name}</td>
                  <td>{cities.president}</td>
                  <td>{cities.presidentsPhone}</td>
                  <td>{cities.secretary}</td>
                  <td>{cities.secretarysPhone}</td>
                  <td>{cities.police}</td>
                  <td>{cities.policesPhone}</td>
                  <td>{cities.doctor}</td>
                  <td>{cities.doctorsPhone}</td>
                  <td>{cities.teacher}</td>
                  <td>{cities.teachersPhone}</td>
                  <td>{cities.priest}</td>
                  <td>{cities.priestsPhone}</td>
                  <td>{cities.country ? <Link to={`countries/${cities.country.id}`}>{cities.country.name}</Link> : ''}</td>
                  <td>{cities.region ? <Link to={`regions/${cities.region.id}`}>{cities.region.name}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${cities.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${cities.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${cities.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="hermesApp.cities.home.notFound">No Cities found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={citiesList && citiesList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Cities;
