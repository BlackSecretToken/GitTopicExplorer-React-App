import React, { useState, useContext } from "react";
import { gql, useQuery } from '@apollo/client';

import SearchContext from "../util/context";
import reducer from "../util/reducer";

/***********************************************
 * tested query with Playground tool first
 * Only filter for the firt 10 on the pagination 
 * - can make it dynamic in the future
************************************************/
const GET_GIT_TOPICS = gql`
  query SearchTopics($search: String!) {
    search(query: $search, type: REPOSITORY, first: 10) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            stargazers {
              totalCount
            }
            resourcePath
            repositoryTopics(first: 10) {
              totalCount
              nodes {
                topic {
                  name
                  stargazerCount
                  relatedTopics {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
  
function SearchResult() {
    const context = useContext(SearchContext);
    let searchTerm = context.searchValue.searchTerm;
    let search = `${searchTerm} stars:>10000`;

    //parsing the search phase into the gql query
    const { loading, error, data } = useQuery(GET_GIT_TOPICS,
      {
        variables: { search}
      });
  
    if (loading){ 
      return (
        <div>
          <i className="fa fa-spinner fa-spin mr-4"/>
          <span>...Searching for {search}</span>
        </div>
      );
    }
    if (error) return `Error! ${error.message}`;
    //debug the result if needed
    console.debug("RESULT:",data);

    return (
      <>
        {data && data.search.edges &&  data.search.edges.map((edge, index) => (
          <ul className="list-group"  key={index}>
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <h5>{edge.node.resourcePath}</h5>
                <span className="badge badge-success badge-pill badge-star"><i className="fa fa-star mr-2" aria-hidden="true" />{edge.node.stargazers.totalCount}</span>
              </div>
              <div>
                Related Topics:
                {edge.node.repositoryTopics.nodes.map((node,j)=>(
                  <button key={j}
                    onClick={() => context.searchDispatch({type: "CHANGE", payload: searchTerm})}
                  type="button" className="btn btn-outline-info btn-sm mx-1 my-1">{node.topic.name}  <span className="badge badge-light badge-pill"><i className="fa fa-star m1-2" aria-hidden="true" />{node.topic.stargazerCount}</span></button>
                   ))}
              </div>
            </li>
          </ul>
        ))}
      </>
    );
  }

 function updateSearchTerm(data){ 
    console.debug("updateSearchTerm",data);
  }

export default SearchResult;