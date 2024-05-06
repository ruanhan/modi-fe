import Container from '@mui/material/Container'

import { paths } from 'src/routes/paths'

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs'

import InvoiceNewEditForm from './invoice-new-edit-form'

// ----------------------------------------------------------------------

export default function InvoiceCreateView() {
  return (
    <Container
      // maxWidth={'lg'}
      maxWidth="xl"
    >
      <CustomBreadcrumbs
        heading="Create a new secret"
        links={[
          {
            name: 'secret',
            href: paths.secret.root,
          },
          {
            name: 'New secret',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <InvoiceNewEditForm />
    </Container>
  )
}
