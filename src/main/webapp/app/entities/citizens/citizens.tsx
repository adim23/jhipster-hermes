import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './citizens.reducer';
import { ICitizens } from 'app/shared/model/citizens.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Citizens = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const citizensList = useAppSelector(state => state.citizens.entities);
  const loading = useAppSelector(state => state.citizens.loading);
  const totalItems = useAppSelector(state => state.citizens.totalItems);

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
      <h2 id="citizens-heading" data-cy="CitizensHeading">
        <Translate contentKey="hermesApp.citizens.home.title">Citizens</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="hermesApp.citizens.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hermesApp.citizens.home.createLabel">Create new Citizens</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {citizensList && citizensList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="hermesApp.citizens.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('title')}>
                  <Translate contentKey="hermesApp.citizens.title">Title</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lastname')}>
                  <Translate contentKey="hermesApp.citizens.lastname">Lastname</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('firstname')}>
                  <Translate contentKey="hermesApp.citizens.firstname">Firstname</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('fathersName')}>
                  <Translate contentKey="hermesApp.citizens.fathersName">Fathers Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('comments')}>
                  <Translate contentKey="hermesApp.citizens.comments">Comments</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('birthDate')}>
                  <Translate contentKey="hermesApp.citizens.birthDate">Birth Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('giortazi')}>
                  <Translate contentKey="hermesApp.citizens.giortazi">Giortazi</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('male')}>
                  <Translate contentKey="hermesApp.citizens.male">Male</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('meLetter')}>
                  <Translate contentKey="hermesApp.citizens.meLetter">Me Letter</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('meLabel')}>
                  <Translate contentKey="hermesApp.citizens.meLabel">Me Label</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('image')}>
                  <Translate contentKey="hermesApp.citizens.image">Image</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesApp.citizens.folder">Folder</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesApp.citizens.company">Company</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesApp.citizens.maritalStatus">Marital Status</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesApp.citizens.team">Team</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesApp.citizens.code">Code</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesApp.citizens.origin">Origin</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="hermesApp.citizens.job">Job</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {citizensList.map((citizens, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${citizens.id}`} color="link" size="sm">
                      {citizens.id}
                    </Button>
                  </td>
                  <td>{citizens.title}</td>
                  <td>{citizens.lastname}</td>
                  <td>{citizens.firstname}</td>
                  <td>{citizens.fathersName}</td>
                  <td>{citizens.comments}</td>
                  <td>
                    {citizens.birthDate ? <TextFormat type="date" value={citizens.birthDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{citizens.giortazi}</td>
                  <td>{citizens.male ? 'true' : 'false'}</td>
                  <td>{citizens.meLetter}</td>
                  <td>{citizens.meLabel}</td>
                  <td>
                    {citizens.image ? (
                      <div>
                        {citizens.imageContentType ? (
                          <a onClick={openFile(citizens.imageContentType, citizens.image)}>
                            <img src={`data:${citizens.imageContentType};base64,${citizens.image}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {citizens.imageContentType}, {byteSize(citizens.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{citizens.folder ? <Link to={`citizen-folders/${citizens.folder.id}`}>{citizens.folder.name}</Link> : ''}</td>
                  <td>{citizens.company ? <Link to={`companies/${citizens.company.id}`}>{citizens.company.name}</Link> : ''}</td>
                  <td>
                    {citizens.maritalStatus ? (
                      <Link to={`marital-status/${citizens.maritalStatus.id}`}>{citizens.maritalStatus.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{citizens.team ? <Link to={`teams/${citizens.team.id}`}>{citizens.team.name}</Link> : ''}</td>
                  <td>{citizens.code ? <Link to={`codes/${citizens.code.id}`}>{citizens.code.name}</Link> : ''}</td>
                  <td>{citizens.origin ? <Link to={`origins/${citizens.origin.id}`}>{citizens.origin.name}</Link> : ''}</td>
                  <td>{citizens.job ? <Link to={`jobs/${citizens.job.id}`}>{citizens.job.name}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${citizens.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${citizens.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${citizens.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="hermesApp.citizens.home.notFound">No Citizens found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={citizensList && citizensList.length > 0 ? '' : 'd-none'}>
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

export default Citizens;
