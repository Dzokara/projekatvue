export default {
    inserted: function(el, binding, vnode) {
      updateVisibility(el, binding, vnode);
    },
    update: function(el, binding, vnode) {
      updateVisibility(el, binding, vnode);
    }
  };
  
  function updateVisibility(el, binding, vnode) {
    let role = vnode.context.$store.getters.role;
  
    if (!binding.value.includes(role)) {
      if (el.parentElement) {
        el.parentElement.removeChild(el);
      }
    } else {
      el.style.display = '';
    }
  }
  