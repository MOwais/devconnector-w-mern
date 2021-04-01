import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getGitHubReposAction } from '../../actions/profile';
import Spinner from '../layout/Spinner';


const ProfileGithub = ({username, getGitHubReposAction, repos }) => {
    useEffect(() => {
        getGitHubReposAction(username);
    }, [getGitHubReposAction]);
   
    return (
        <div className='profile-github'>
            <h2 className="text-primary my-1">Github Repos</h2>
            {!repos ? <Spinner /> : 
                repos.map(repo => (
                    <div key={repo.id} className='repo bg-white my-1 p-1'>
                        <div> 
                            <h4>
                                <a href={repo.html_url} target="_blank" rel='noopener noreferrer'>
                                    {repo.name}
                                </a>
                            </h4>
                            <p>{repo.description}</p>
                        </div>
                        <div>
                            <ul>
                                <li className='badge badge-primary'>
                                    Stars: {repo.stargazers_count}
                                </li>
                                <li className='badge badge-dark'>
                                    Watchers: {repo.watchers_count}
                                </li>
                                <li className='badge badge-light'>
                                    Forks: {repo.forks_count}
                                </li>
                            </ul>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

ProfileGithub.propTypes = {
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
    getGitHubReposAction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    repos: state.profile.repos
})

export default connect(mapStateToProps,{ getGitHubReposAction })(ProfileGithub);
