/** @jsx jsx */

import { useState } from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { listTimeZones } from 'timezone-support';
import axios from 'axios';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { Link } from 'gatsby';

const Form = styled('form')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Label = styled('label')`
  display: block;
  width: 100%;

  @media (min-width: 680px) {
    flex: ${({ fullWidth }) => (fullWidth ? '2 100%' : '1 45%')};
    margin-top: 1rem;
    max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '45%')};
  }
`;

const Input = ({ name, type, value, onChange, ...rest }) => (
  <input
    name={name}
    css={{
      display: 'block',
      fontSize: '1rem',
      padding: '0.5rem',
      width: '100%'
    }}
    type={type}
    value={value}
    onChange={event => {
      event.preventDefault();
      onChange(name, event.target.value);
    }}
    {...rest}
  />
);

const TextArea = ({ name, type, value, onChange, ...rest }) => (
  <textarea
    css={{
      display: 'block',
      fontSize: '1rem',
      height: '7rem',
      padding: '0.5rem',
      width: '100%'
    }}
    name={name}
    value={value}
    onChange={event => {
      event.preventDefault();
      onChange(name, event.target.value);
    }}
    {...rest}
  />
);

const Select = ({ name, type, value, options, onChange, ...rest }) => (
  <select
    css={{
      display: 'block',
      fontSize: '1rem',
      padding: '0.5rem',
      width: '100%'
    }}
    name={name}
    value={value}
    onChange={event => {
      event.preventDefault();
      onChange(name, event.target.value);
    }}
    {...rest}
  >
    {options.map(option => (
      <option key={`tz-${option}`} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const Button = styled('button')`
  background: rebeccapurple;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  display: block;
  flex: 2 100%;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-top: 2rem;
  padding: 1rem;
  text-transform: uppercase;
`;

const IndexPage = () => {
  const [values, setValues] = useState({
    client: '',
    title: '',
    description: '',
    start: '',
    duration: 30,
    location: '',
    alarm: '',
    timezone: 'America/Los_Angeles'
  });

  const [shortLink, setShortLink] = useState();
  const [fullLink, setFullLink] = useState();

  const {
    client,
    title,
    description,
    start,
    duration,
    location,
    alarm,
    timezone
  } = values;

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const queryString = new URLSearchParams(values);

    setFullLink(`https://www.addevent.com/dir/?${queryString}`);

    const { status, data } = await axios.get(
      `https://www.addevent.com/dir/link/add/?${queryString}`
    );

    if (status === 200) {
      setShortLink(data.data.link);
    }
  };

  return (
    <Layout>
      <SEO title="Create" />
      <p>
        For some reason this doesn’t already exist. <strong>NOTE:</strong> A
        paid <a href="https://www.addevent.com">AddEvent</a> account is required
        to use this method of creating events.
      </p>
      {shortLink ? (
        <div>
          <h2>Your Event Short Link Is:</h2>
          <ul>
            <li>
              <strong>Short Link:</strong> {shortLink}
            </li>
            <li>
              <strong>Direct Link:</strong>
              <pre
                css={{
                  background: 'lightgrey',
                  borderRadius: 4,
                  fontSize: '75%',
                  overflowX: 'auto',
                  padding: '1rem',
                  width: '100%'
                }}
              >
                {fullLink}
              </pre>
            </li>
          </ul>
          <Link
            to="/"
            onClick={event => {
              event.preventDefault();
              setShortLink(false);
              setFullLink(false);
            }}
          >
            Create another link
          </Link>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Label>
            Title
            <Input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Location
            <Input
              type="text"
              name="location"
              value={location}
              onChange={handleChange}
            />
          </Label>
          <Label fullWidth>
            Description
            <TextArea
              name="description"
              value={description}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Start Date
            <Input
              type="datetime-local"
              name="start"
              value={start}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Duration
            <Input
              type="number"
              min={0}
              name="duration"
              value={duration}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Reminder (in minutes)
            <Input
              type="number"
              min={0}
              name="alarm"
              value={alarm}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Timezone
            <Select
              type="text"
              name="timezone"
              value={timezone}
              options={listTimeZones()}
              onChange={handleChange}
            />
          </Label>
          <Label>
            Client ID (<a href="https://www.addevent.com/account">get yours</a>)
            <Input
              type="text"
              name="client"
              value={client}
              onChange={handleChange}
            />
          </Label>
          <Button type="submit">Create the Link</Button>
        </Form>
      )}
    </Layout>
  );
};

export default IndexPage;
