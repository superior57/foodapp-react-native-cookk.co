import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Divider} from 'react-native-paper';
// mui
import {Dialog, Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../../../../components/typography';
// sections
// routes
// redux
// theme

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    borderRadius: 5,
    width: '130%',
    left: '-15%',
    height: 600,
    backgroundColor: 'white',
    zIndex: 10,
  },

  closeButton: {
    position: 'absolute',
    backgroundColor: 'white',
    right: -30,
    top: 10,
    zIndex: 99999,
  },
});

// ----------------------------------------------------------------------

export default function PolicyDialog({...other}) {
  return (
    <Dialog {...other}>
      <TouchableOpacity onPress={other.onDismiss} style={styles.closeButton}>
        <Icon name="close" size={20} />
      </TouchableOpacity>
      <ScrollView style={styles.wrapper}>
        <Stack gap={5} style={{padding: 20}}>
          <Typography variant="h6" fontWeight="bold">
            Privacy Policy
          </Typography>

          <Divider />

          <Typography>Effective Date: 05/23/2023</Typography>

          <Typography>Introduction:</Typography>

          <Typography>
            Hello, everyone! Welcome to Cookk, an innovative food sharing
            platform connecting talented home cooks with customers and
            businesses seeking fresh, homemade meals. We are committed to
            protecting your privacy and ensuring the security of your personal
            information. This Privacy Policy outlines how we collect, use,
            disclose, and safeguard your information when you use our website.
            By accessing or using Cookk, you agree to the terms and conditions
            of this policy.
          </Typography>

          <Typography>Information We Collect:</Typography>

          <Typography>Personal Information:</Typography>

          <Typography>
            When you create an account on our website, we collect your name,
            email address, and contact information. If you choose to provide it,
            we may also collect additional personal information, such as your
            address and payment details, to facilitate transactions.
          </Typography>
          <Typography>Non-Personal Information:</Typography>

          <Typography>
            We may collect non-personal information, such as your IP address,
            browser type, device information, and usage patterns, to improve our
            website's performance and enhance your experience.
          </Typography>
          <Typography>How We Use Your Information:</Typography>

          <Typography>Personal Information:</Typography>

          <Typography>
            We use your personal information to create and manage your Cookk
            account, process transactions, and provide customer support. With
            your consent, we may use your email address to send you updates,
            promotional offers, and marketing materials related to Cookk. You
            can opt-out of receiving these communications at any time.
          </Typography>
          <Typography>Non-Personal Information:</Typography>

          <Typography>
            We may use non-personal information for analytical purposes, to
            monitor and analyze trends, usage patterns, and demographics, which
            helps us improve our services and enhance user experience.
          </Typography>
          <Typography>Information Sharing and Disclosure:</Typography>

          <Typography>Service Providers:</Typography>

          <Typography>
            We may share your personal information with trusted third-party
            service providers who assist us in operating our website, processing
            payments, and delivering services. These service providers are
            contractually obligated to handle your information securely and only
            for authorized purposes.
          </Typography>
          <Typography>Legal Compliance:</Typography>

          <Typography>
            We may disclose your information if required by law, such as in
            response to a court order, government request, or to protect our
            rights, property, or safety, or the rights, property, or safety of
            others.
          </Typography>
          <Typography>Data Security:</Typography>

          <Typography>
            We implement appropriate technical and organizational measures to
            protect your personal information from unauthorized access, use,
            alteration, or disclosure. However, please note that no data
            transmission over the internet or electronic storage system is 100%
            secure.
          </Typography>

          <Typography>Your Choices:</Typography>

          <Typography>Account Information:</Typography>

          <Typography>
            You can review and update your account information by logging into
            your Cookk account settings.
          </Typography>
          <Typography>Communication Preferences:</Typography>

          <Typography>
            You have the option to unsubscribe from marketing communications by
            following the instructions provided in the emails we send. However,
            we may still send you transactional or service-related
            communications.
          </Typography>
          <Typography>Cookies and Tracking Technologies:</Typography>

          <Typography>
            Most web browsers are set to accept cookies by default. You can
            adjust your browser settings to refuse cookies or alert you when
            cookies are being sent. However, certain features of Cookk may not
            function properly without cookies.
          </Typography>
          <Typography>Updates to this Privacy Policy:</Typography>

          <Typography>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal obligations. We encourage you to
            review this policy periodically for any updates. The revised Privacy
            Policy will be effective immediately upon posting.
          </Typography>

          <Typography>Contact Us:</Typography>

          <Typography>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or our privacy practices, please contact us at
            info@cookk.co
          </Typography>

          <Typography>
            By using Cookk, you acknowledge that you have read and understood
            this Privacy Policy and consent to the collection, use, and
            disclosure of your information as described herein.
          </Typography>
        </Stack>
      </ScrollView>
    </Dialog>
  );
}
