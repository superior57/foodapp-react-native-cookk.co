import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {TouchableOpacity, StyleSheet} from 'react-native';
// mui
import {
  Dialog,
  DialogContent,
  DialogHeader,
  Stack,
} from '@react-native-material/core';
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
  content: {
    gap: 20,
    marginTop: 10,
    padding: 5,
  },

  closeButton: {
    position: 'absolute',
    right: -10,
    top: -50,
  },
});
// ----------------------------------------------------------------------

export default function ServiceDialog({...other}) {
  return (
    <Dialog {...other}>
      <DialogHeader title="Terms of Service" />
      <DialogContent style={styles.content}>
        <TouchableOpacity onPress={other.dismiss}>
          <Icon name="close" size={20} style={styles.closeButton} />
        </TouchableOpacity>
        <Stack gap={5}>
          <Typography>Effective Date: 05/23/2023</Typography>

          <Typography>
            Welcome to Cookk! These Terms of Service ("Terms") govern your
            access to and use of the Cookk website (the "Website") and related
            services (collectively, the "Services"). By accessing or using the
            Services, you agree to comply with and be bound by these Terms. If
            you do not agree with these Terms, please do not use the Services.
          </Typography>

          <Typography>User Eligibility:</Typography>

          <Typography>
            You must be at least 18 years old to use the Services. By using the
            Services, you represent and warrant that you are 18 years of age or
            older and have the legal capacity to enter into these Terms.
          </Typography>

          <Typography>Account Registration:</Typography>

          <Typography>
            To access certain features of the Services, you may need to create
            an account. You are responsible for maintaining the confidentiality
            of your account credentials and for all activities that occur under
            your account. You agree to provide accurate, current, and complete
            information during the registration process and to update such
            information as necessary to keep it accurate, current, and complete.
          </Typography>

          <Typography>Use of the Services:</Typography>

          <Typography>
            a. License: Subject to your compliance with these Terms, Cookk
            grants you a limited, non-exclusive, non-transferable, and revocable
            license to access and use the Services for personal, non-commercial
            purposes.
          </Typography>

          <Typography>
            b. Prohibited Conduct: You agree that you will not: Use the Services
            for any unlawful, unauthorized, or fraudulent purposes. Engage in
            any activity that could interfere with or disrupt the functioning of
            the Services. Post, upload, or transmit any content that is harmful,
            offensive, defamatory, or violates the rights of others. Attempt to
            gain unauthorized access to any part of the Services or any other
            systems or networks connected to the Services. Use any automated
            means, such as bots or scrapers, to access or collect information
            from the Services.
          </Typography>
          <Typography>
            c. Content Ownership: Cookk retains all rights, title, and interest
            in and to the Services, including all content, trademarks, logos,
            and intellectual property. You may not use, reproduce, modify, or
            distribute any content from the Services without prior written
            permission from Cookk.
          </Typography>

          <Typography>Transactions and Payments:</Typography>

          <Typography>
            a. Chef Services: Cookk enables transactions between home chefs
            ("Chefs") and customers. The terms and conditions of any transaction
            between a Chef and a customer are solely between the Chef and the
            customer.
          </Typography>

          <Typography>
            b. Payments: Cookk facilitates payments between Chefs and customers
            through third-party payment processors. Cookk is not responsible for
            any issues related to payments or transactions, including refunds,
            disputes, or unauthorized transactions.
          </Typography>

          <Typography>Privacy:</Typography>

          <Typography>
            Your privacy is important to us. Please review our Privacy Policy
            [provide hyperlink] to understand how we collect, use, and disclose
            your information when you use the Services.
          </Typography>

          <Typography>Disclaimer of Warranties:</Typography>

          <Typography>
            The Services are provided on an "as is" and "as available" basis,
            without warranties of any kind, whether express or implied. Cookk
            does not warrant that the Services will be uninterrupted,
            error-free, or secure, or that any defects or errors will be
            corrected.
          </Typography>

          <Typography>Limitation of Liability:</Typography>

          <Typography>
            To the fullest extent permitted by applicable law, Cookk and its
            affiliates, officers, directors, employees, and agents will not be
            liable to you for any indirect, incidental, consequential, punitive,
            or exemplary damages arising out of or in connection with your use
            of the Services.
          </Typography>

          <Typography>Indemnification:</Typography>

          <Typography>
            You agree to indemnify, defend, and hold harmless Cookk and its
            affiliates, officers, directors, employees, and agents from and
            against any claims, liabilities, damages, losses, costs, or
            expenses, including reasonable attorneys' fees, arising out of or in
            connection with your use of the Services.
          </Typography>

          <Typography>Beta Testing:</Typography>

          <Typography>
            Cookk is currently in the beta testing phase. During this period,
            the Services may contain bugs, errors, or other issues. By using the
            Services, you acknowledge and understand that Cookk is not
            responsible for any errors, malfunctions, or adverse effects that
            may occur during the beta testing phase.
          </Typography>

          <Typography>Food Safety and Liability:</Typography>

          <Typography>
            a. Cookk acts as an intermediary platform connecting Chefs and
            customers. We do not assume responsibility for the quality, safety,
            or legality of the food prepared by the Chefs. The Chefs are solely
            responsible for ensuring the safety and compliance of their food
            with applicable laws and regulations.
          </Typography>

          <Typography>
            b. By using the Services, you acknowledge that Cookk does not
            conduct any inspections or verifications of the Chefs' food
            preparation facilities or processes. It is your responsibility to
            exercise caution, conduct your own due diligence, and make informed
            decisions when ordering food from Chefs.
          </Typography>

          <Typography>
            c. Cookk encourages users to provide feedback and report any issues
            with the quality or safety of the food. However, Cookk is not liable
            for any illness, injury, or harm that may result from the
            consumption of food prepared by the Chefs.
          </Typography>

          <Typography>Modifications to the Services:</Typography>
          <Typography>
            Cookk reserves the right to modify, suspend, or discontinue any
            aspect of the Services at any time, without prior notice or
            liability. We may also impose limits on certain features or restrict
            your access to parts or all of the Services without notice or
            liability.
          </Typography>

          <Typography>Severability:</Typography>
          <Typography>
            If any provision of these Terms is held to be invalid, illegal, or
            unenforceable, such provision shall be modified to the extent
            necessary to make it enforceable while maintaining the intent of
            these Terms. If such modification is not possible, the provision
            shall be deemed severed from these Terms, and the remaining
            provisions shall continue in full force and effect.
          </Typography>

          <Typography>Entire Agreement:</Typography>
          <Typography>
            These Terms constitute the entire agreement between you and Cookk
            regarding the subject matter herein and supersede all prior or
            contemporaneous communications and proposals, whether oral or
            written, between you and Cookk.
          </Typography>

          <Typography>Contact Us:</Typography>
          <Typography>
            If you have any questions or concerns regarding these Terms or the
            Services, please contact us at info@cookk.co
          </Typography>

          <Typography>
            By using the Services, you acknowledge that you have read,
            understood, and agree to be bound by these Terms of Service.
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
