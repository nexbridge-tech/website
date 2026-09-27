(() => {
  const service = document.getElementById('service-interest');
  if (!service) return;
  const requested = new URLSearchParams(window.location.search).get('service');
  if ([...service.options].some(option => option.value === requested)) service.value = requested;
  const message = document.getElementById('project-message');
  const updateHint = () => {
    message.placeholder = ['manufacturing', 'cnc', 'jigs', 'pcba'].includes(service.value)
      ? 'What do you need made? Include quantity, drawing revision, material or board requirements, target schedule and delivery country.'
      : 'Tell us about your project or question';
  };
  service.addEventListener('change', updateHint);
  updateHint();
})();
