/**
 * Northline screener: builds the Google Form + linked response Sheet.
 * Paste into https://script.google.com (New project), then click Run.
 */
function createNorthlineScreener() {
  var form = FormApp.create('Help test a new internet account design (20 min, $15 gift card)');
  form.setDescription(
    "I'm a UX designer testing a design for managing a home internet account. " +
    "I'm looking for people to try it on a 20-minute video call. There are no right or wrong answers, " +
    "since I'm testing the design, not you. Selected participants get a $15 coffee or Amazon gift card. " +
    "Your answers are only seen by me and are deleted after the study."
  );
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setConfirmationMessage("Thanks! If you're a good fit, I'll email you within a few days to book a time.");

  form.addMultipleChoiceItem()
    .setTitle('In the last 12 months, have you cancelled or tried to cancel your home internet?')
    .setChoiceValues(['Yes, I cancelled', "Yes, I tried but didn't", 'No'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('What was the main reason?')
    .setChoiceValues(['Price', 'Slow or unreliable service', 'Moving'])
    .showOtherOption(true)
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Did anything make you give up or change your mind partway?')
    .setChoiceValues(['Yes', 'No']);

  form.addMultipleChoiceItem()
    .setTitle('Do you work in tech, telecom or design?')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);

  form.addTextItem().setTitle('First name').setRequired(true);

  form.addTextItem()
    .setTitle('Email')
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().build())
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Which times usually work for a 20-minute call?')
    .setChoiceValues(['Weekday mornings', 'Weekday afternoons', 'Weekday evenings', 'Weekends']);

  form.addCheckboxItem()
    .setTitle('Consent')
    .setChoiceValues(['I agree to be contacted about this study.'])
    .setRequired(true);

  // Response record: a linked Google Sheet
  var sheet = SpreadsheetApp.create('Northline screener responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('Share this link:  ' + form.getPublishedUrl());
  Logger.log('Edit the form:    ' + form.getEditUrl());
  Logger.log('Response sheet:   ' + sheet.getUrl());
}
